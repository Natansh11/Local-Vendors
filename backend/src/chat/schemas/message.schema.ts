import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Group', required: true })
  groupId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: ['text', 'file', 'system'], default: 'text' })
  type: string;

  @Prop({ type: [Object], default: [] })
  attachments: any[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  readBy: Types.ObjectId[];

  @Prop({ default: false })
  isEdited: boolean;

  @Prop()
  editedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  replyTo: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Add indexes
MessageSchema.index({ groupId: 1, createdAt: -1 });
MessageSchema.index({ userId: 1 });
