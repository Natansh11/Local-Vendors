import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
    private groupsService: GroupsService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    const { groupId, type, amount } = createTransactionDto;

    // Verify user is a member of the group
    const isMember = await this.groupsService.isMember(groupId, userId);
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this group');
    }

    // Get group to check settings
    const group = await this.groupsService.findOne(groupId);

    // Validate based on transaction type
    if (type === 'contribution' && group.settings.minContribution > 0) {
      if (amount < group.settings.minContribution) {
        throw new BadRequestException(
          `Minimum contribution is ${group.settings.minContribution}`,
        );
      }
    }

    if (type === 'loan' && group.settings.maxLoanAmount > 0) {
      if (amount > group.settings.maxLoanAmount) {
        throw new BadRequestException(
          `Maximum loan amount is ${group.settings.maxLoanAmount}`,
        );
      }
    }

    // Determine initial status based on group settings
    let initialStatus = 'completed';
    if (group.settings.requireApproval) {
      if (type === 'withdrawal' || type === 'loan') {
        initialStatus = 'pending';
      }
    }

    const transaction = new this.transactionModel({
      ...createTransactionDto,
      groupId: new Types.ObjectId(groupId),
      userId: new Types.ObjectId(userId),
      status: initialStatus,
    });

    // If contribution and doesn't require approval, process immediately
    if (type === 'contribution' && initialStatus === 'completed') {
      await this.groupsService.updateWalletBalance(groupId, amount, 'add');
      await this.groupsService.updateMemberContribution(groupId, userId, amount);
      transaction.completedAt = new Date();
    }

    return transaction.save();
  }

  async findAll(filters?: {
    groupId?: string;
    userId?: string;
    type?: string;
    status?: string;
  }): Promise<Transaction[]> {
    const query: any = {};

    if (filters?.groupId) {
      query.groupId = new Types.ObjectId(filters.groupId);
    }
    if (filters?.userId) {
      query.userId = new Types.ObjectId(filters.userId);
    }
    if (filters?.type) {
      query.type = filters.type;
    }
    if (filters?.status) {
      query.status = filters.status;
    }

    return this.transactionModel
      .find(query)
      .populate('userId', 'name email')
      .populate('groupId', 'name')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('userId', 'name email')
      .populate('groupId', 'name')
      .populate('approvedBy', 'name email')
      .exec();

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async updateStatus(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
    adminId: string,
  ): Promise<Transaction> {
    const transaction = await this.findOne(id);

    // Verify admin rights
    const isAdmin = await this.groupsService.isAdmin(
      transaction.groupId.toString(),
      adminId,
    );

    if (!isAdmin) {
      throw new ForbiddenException(
        'Only group admin can approve/reject transactions',
      );
    }

    const { status, rejectionReason } = updateTransactionDto;

    if (status === 'approved') {
      await this.processTransaction(transaction);
      transaction.approvedBy = new Types.ObjectId(adminId);
      transaction.approvedAt = new Date();
      transaction.status = 'completed';
      transaction.completedAt = new Date();
    } else if (status === 'rejected') {
      transaction.status = 'rejected';
      transaction.rejectionReason = rejectionReason;
    }

    return transaction.save();
  }

  private async processTransaction(transaction: Transaction): Promise<void> {
    const groupId = transaction.groupId.toString();
    const userId = transaction.userId.toString();
    const { type, amount } = transaction;

    switch (type) {
      case 'contribution':
        await this.groupsService.updateWalletBalance(groupId, amount, 'add');
        await this.groupsService.updateMemberContribution(
          groupId,
          userId,
          amount,
        );
        break;

      case 'withdrawal':
        await this.groupsService.updateWalletBalance(
          groupId,
          amount,
          'subtract',
        );
        break;

      case 'loan':
        await this.groupsService.updateWalletBalance(
          groupId,
          amount,
          'subtract',
        );
        // Update loan details
        if (transaction.loanDetails) {
          transaction.loanDetails.totalAmount = amount;
          transaction.loanDetails.paidAmount = 0;
        }
        break;

      case 'repayment':
        await this.groupsService.updateWalletBalance(groupId, amount, 'add');
        // Update original loan transaction
        // This would require finding and updating the original loan
        break;
    }
  }

  async getGroupBalance(groupId: string): Promise<any> {
    const group = await this.groupsService.findOne(groupId);

    const transactions = await this.findAll({
      groupId,
      status: 'completed',
    });

    const contributions = transactions
      .filter((t) => t.type === 'contribution')
      .reduce((sum, t) => sum + t.amount, 0);

    const withdrawals = transactions
      .filter((t) => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);

    const loans = transactions
      .filter((t) => t.type === 'loan')
      .reduce((sum, t) => sum + t.amount, 0);

    const repayments = transactions
      .filter((t) => t.type === 'repayment')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      currentBalance: group.wallet.balance,
      totalContributions: contributions,
      totalWithdrawals: withdrawals,
      totalLoans: loans,
      totalRepayments: repayments,
      outstandingLoans: loans - repayments,
    };
  }
}
