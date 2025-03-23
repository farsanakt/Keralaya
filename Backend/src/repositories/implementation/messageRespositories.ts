// src/repositories/messageRepository.ts
import Message, { IMessage } from '@/models/userModel/messageModel';
import mongoose from 'mongoose';

export class MessageRepository {
  async findByConversationId(conversationId: string): Promise<IMessage[]> {
    return await Message.find({ conversationId: new mongoose.Types.ObjectId(conversationId) })
      .sort({ createdAt: 1 })
      .populate('sender', 'name profileImage');
  }

  async create(data: Partial<IMessage>): Promise<IMessage> {
    return await Message.create(data);
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    await Message.updateMany(
      { 
        conversationId: new mongoose.Types.ObjectId(conversationId),
        sender: { $ne: new mongoose.Types.ObjectId(userId) },
        read: false
      },
      { read: true }
    );
  }

  async countUnread(conversationId: string, userId: string): Promise<number> {
    return await Message.countDocuments({
      conversationId: new mongoose.Types.ObjectId(conversationId),
      sender: { $ne: new mongoose.Types.ObjectId(userId) },
      read: false
    });
  }
}