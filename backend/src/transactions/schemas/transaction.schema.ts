import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class LoanDetails {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  borrowerId: Types.ObjectId;

  @Prop()
  dueDate: Date;

  @Prop({ default: 0 })
  interestRate: number;

  @Prop({ default: 0 })
  totalAmount: number;

  @Prop({ default: 0 })
  paidAmount: number;

  @Prop({ type: [Object], default: [] })
  repaymentSchedule: any[];
}

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Group', required: true })
  groupId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['contribution', 'withdrawal', 'loan', 'repayment'],
  })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({
    required: true,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop()
  description: string;

  @Prop({ type: LoanDetails })
  loanDetails: LoanDetails;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy: Types.ObjectId;

  @Prop()
  approvedAt: Date;

  @Prop()
  rejectionReason: string;

  @Prop()
  completedAt: Date;

  @Prop({ type: Object })
  metadata: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// Add indexes
TransactionSchema.index({ groupId: 1, createdAt: -1 });
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ type: 1 });
