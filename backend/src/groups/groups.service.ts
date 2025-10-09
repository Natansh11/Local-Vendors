import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from './schemas/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async create(createGroupDto: CreateGroupDto, userId: string): Promise<Group> {
    const group = new this.groupModel({
      ...createGroupDto,
      adminId: userId,
      members: [
        {
          userId: new Types.ObjectId(userId),
          role: 'admin',
          joinedAt: new Date(),
          contributionTotal: 0,
        },
      ],
      settings: {
        minContribution: createGroupDto.minContribution || 0,
        maxLoanAmount: createGroupDto.maxLoanAmount || 0,
        requireApproval: createGroupDto.requireApproval ?? true,
      },
    });

    return group.save();
  }

  async findAll(userId?: string): Promise<Group[]> {
    const query = userId
      ? { 'members.userId': new Types.ObjectId(userId), status: 'active' }
      : { status: 'active' };

    return this.groupModel
      .find(query)
      .populate('adminId', 'name email')
      .populate('members.userId', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupModel
      .findById(id)
      .populate('adminId', 'name email')
      .populate('members.userId', 'name email')
      .exec();

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
    userId: string,
  ): Promise<Group> {
    const group = await this.findOne(id);

    // Check if user is admin
    if (group.adminId.toString() !== userId) {
      throw new ForbiddenException('Only group admin can update the group');
    }

    Object.assign(group, updateGroupDto);

    if (updateGroupDto.minContribution !== undefined) {
      group.settings.minContribution = updateGroupDto.minContribution;
    }
    if (updateGroupDto.maxLoanAmount !== undefined) {
      group.settings.maxLoanAmount = updateGroupDto.maxLoanAmount;
    }
    if (updateGroupDto.requireApproval !== undefined) {
      group.settings.requireApproval = updateGroupDto.requireApproval;
    }

    return group.save();
  }

  async joinGroup(groupId: string, userId: string): Promise<Group> {
    const group = await this.findOne(groupId);

    // Check if user is already a member
    const isMember = group.members.some(
      (member) => member.userId.toString() === userId,
    );

    if (isMember) {
      throw new BadRequestException('You are already a member of this group');
    }

    group.members.push({
      userId: new Types.ObjectId(userId),
      role: 'member',
      joinedAt: new Date(),
      contributionTotal: 0,
    });

    return group.save();
  }

  async leaveGroup(groupId: string, userId: string): Promise<Group> {
    const group = await this.findOne(groupId);

    // Admin cannot leave their own group
    if (group.adminId.toString() === userId) {
      throw new BadRequestException(
        'Admin cannot leave the group. Transfer admin rights first.',
      );
    }

    group.members = group.members.filter(
      (member) => member.userId.toString() !== userId,
    );

    return group.save();
  }

  async isMember(groupId: string, userId: string): Promise<boolean> {
    const group = await this.findOne(groupId);
    return group.members.some(
      (member) => member.userId.toString() === userId,
    );
  }

  async isAdmin(groupId: string, userId: string): Promise<boolean> {
    const group = await this.findOne(groupId);
    return group.adminId.toString() === userId;
  }

  async updateMemberContribution(
    groupId: string,
    userId: string,
    amount: number,
  ): Promise<void> {
    const group = await this.findOne(groupId);

    const member = group.members.find(
      (m) => m.userId.toString() === userId,
    );

    if (member) {
      member.contributionTotal += amount;
      await group.save();
    }
  }

  async updateWalletBalance(
    groupId: string,
    amount: number,
    operation: 'add' | 'subtract',
  ): Promise<Group> {
    const group = await this.findOne(groupId);

    if (operation === 'add') {
      group.wallet.balance += amount;
    } else {
      if (group.wallet.balance < amount) {
        throw new BadRequestException('Insufficient group wallet balance');
      }
      group.wallet.balance -= amount;
    }

    return group.save();
  }

  async searchGroups(query: string): Promise<Group[]> {
    return this.groupModel
      .find({
        $text: { $search: query },
        status: 'active',
      })
      .populate('adminId', 'name email')
      .limit(20)
      .exec();
  }
}
