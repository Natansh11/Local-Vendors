import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class GroupMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: ['admin', 'member'], default: 'member' })
  role: string;

  @Prop({ default: Date.now })
  joinedAt: Date;

  @Prop({ default: 0 })
  contributionTotal: number;
}

export class GroupWallet {
  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 'INR' })
  currency: string;
}

export class GroupSettings {
  @Prop({ default: 0 })
  minContribution: number;

  @Prop({ default: 0 })
  maxLoanAmount: number;

  @Prop({ default: true })
  requireApproval: boolean;

  @Prop({ default: 30 })
  loanTermDays: number;
}

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  adminId: Types.ObjectId;

  @Prop({ type: [GroupMember], default: [] })
  members: GroupMember[];

  @Prop({ type: GroupWallet, default: () => ({}) })
  wallet: GroupWallet;

  @Prop({ type: GroupSettings, default: () => ({}) })
  settings: GroupSettings;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop()
  avatar: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);

// Add indexes for performance
GroupSchema.index({ name: 'text', description: 'text' });
GroupSchema.index({ 'members.userId': 1 });
GroupSchema.index({ adminId: 1 });
GroupSchema.index({ status: 1 });
