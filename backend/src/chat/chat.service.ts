import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(
    groupId: string,
    userId: string,
    content: string,
    type: string = 'text',
    attachments: any[] = [],
  ): Promise<Message> {
    const message = new this.messageModel({
      groupId: new Types.ObjectId(groupId),
      userId: new Types.ObjectId(userId),
      content,
      type,
      attachments,
    });

    return message.save();
  }

  async getMessages(
    groupId: string,
    limit: number = 50,
    before?: Date,
  ): Promise<Message[]> {
    const query: any = { groupId: new Types.ObjectId(groupId) };

    if (before) {
      query.createdAt = { $lt: before };
    }

    return this.messageModel
      .find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async markAsRead(messageId: string, userId: string): Promise<Message> {
    const message = await this.messageModel.findById(messageId);

    if (message && !message.readBy.includes(new Types.ObjectId(userId))) {
      message.readBy.push(new Types.ObjectId(userId));
      return message.save();
    }

    return message;
  }

  async markGroupMessagesAsRead(
    groupId: string,
    userId: string,
  ): Promise<void> {
    await this.messageModel.updateMany(
      {
        groupId: new Types.ObjectId(groupId),
        userId: { $ne: new Types.ObjectId(userId) },
        readBy: { $ne: new Types.ObjectId(userId) },
      },
      {
        $addToSet: { readBy: new Types.ObjectId(userId) },
      },
    );
  }

  async deleteMessage(messageId: string, userId: string): Promise<boolean> {
    const message = await this.messageModel.findById(messageId);

    if (message && message.userId.toString() === userId) {
      await message.deleteOne();
      return true;
    }

    return false;
  }

  async editMessage(
    messageId: string,
    userId: string,
    newContent: string,
  ): Promise<Message> {
    const message = await this.messageModel.findById(messageId);

    if (message && message.userId.toString() === userId) {
      message.content = newContent;
      message.isEdited = true;
      message.editedAt = new Date();
      return message.save();
    }

    return null;
  }

  async getUnreadCount(groupId: string, userId: string): Promise<number> {
    return this.messageModel.countDocuments({
      groupId: new Types.ObjectId(groupId),
      userId: { $ne: new Types.ObjectId(userId) },
      readBy: { $ne: new Types.ObjectId(userId) },
    });
  }
}
