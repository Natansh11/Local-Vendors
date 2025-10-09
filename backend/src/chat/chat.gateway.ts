import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GroupsService } from '../groups/groups.service';
import { JwtService } from '@nestjs/jwt';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  user?: any;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, Set<string>> = new Map();

  constructor(
    private chatService: ChatService,
    private groupsService: GroupsService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token = client.handshake.auth.token;
      
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      client.userId = payload.sub;
      client.user = payload;

      // Track user socket
      if (!this.userSockets.has(client.userId)) {
        this.userSockets.set(client.userId, new Set());
      }
      this.userSockets.get(client.userId).add(client.id);

      console.log(`Client connected: ${client.id}, User: ${client.userId}`);
    } catch (error) {
      console.error('Connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      const userSocketSet = this.userSockets.get(client.userId);
      if (userSocketSet) {
        userSocketSet.delete(client.id);
        if (userSocketSet.size === 0) {
          this.userSockets.delete(client.userId);
        }
      }
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-group')
  async handleJoinGroup(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { groupId: string },
  ) {
    const { groupId } = data;

    // Verify user is a member
    const isMember = await this.groupsService.isMember(groupId, client.userId);
    if (!isMember) {
      client.emit('error', { message: 'Not a member of this group' });
      return;
    }

    client.join(`group-${groupId}`);
    
    // Load recent messages
    const messages = await this.chatService.getMessages(groupId, 50);
    client.emit('messages-history', messages.reverse());

    // Get unread count
    const unreadCount = await this.chatService.getUnreadCount(
      groupId,
      client.userId,
    );
    client.emit('unread-count', { count: unreadCount });

    // Notify others
    this.server
      .to(`group-${groupId}`)
      .emit('user-joined', { userId: client.userId });
  }

  @SubscribeMessage('leave-group')
  handleLeaveGroup(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { groupId: string },
  ) {
    const { groupId } = data;
    client.leave(`group-${groupId}`);
    
    this.server
      .to(`group-${groupId}`)
      .emit('user-left', { userId: client.userId });
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    data: {
      groupId: string;
      content: string;
      type?: string;
      attachments?: any[];
    },
  ) {
    const { groupId, content, type, attachments } = data;

    // Verify membership
    const isMember = await this.groupsService.isMember(groupId, client.userId);
    if (!isMember) {
      client.emit('error', { message: 'Not a member of this group' });
      return;
    }

    // Save message
    const message = await this.chatService.createMessage(
      groupId,
      client.userId,
      content,
      type || 'text',
      attachments || [],
    );

    // Populate user data for response
    await message.populate('userId', 'name email');

    // Broadcast to group
    this.server.to(`group-${groupId}`).emit('new-message', message);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { groupId: string; isTyping: boolean },
  ) {
    const { groupId, isTyping } = data;
    
    client.to(`group-${groupId}`).emit('user-typing', {
      userId: client.userId,
      isTyping,
    });
  }

  @SubscribeMessage('message-read')
  async handleMessageRead(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { messageId: string; groupId: string },
  ) {
    const { messageId, groupId } = data;

    await this.chatService.markAsRead(messageId, client.userId);

    this.server.to(`group-${groupId}`).emit('message-read-update', {
      messageId,
      userId: client.userId,
    });
  }

  @SubscribeMessage('mark-all-read')
  async handleMarkAllRead(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { groupId: string },
  ) {
    const { groupId } = data;

    await this.chatService.markGroupMessagesAsRead(groupId, client.userId);

    client.emit('unread-count', { count: 0 });
  }

  @SubscribeMessage('edit-message')
  async handleEditMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    data: { messageId: string; groupId: string; content: string },
  ) {
    const { messageId, groupId, content } = data;

    const message = await this.chatService.editMessage(
      messageId,
      client.userId,
      content,
    );

    if (message) {
      this.server.to(`group-${groupId}`).emit('message-edited', message);
    }
  }

  @SubscribeMessage('delete-message')
  async handleDeleteMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { messageId: string; groupId: string },
  ) {
    const { messageId, groupId } = data;

    const deleted = await this.chatService.deleteMessage(
      messageId,
      client.userId,
    );

    if (deleted) {
      this.server.to(`group-${groupId}`).emit('message-deleted', { messageId });
    }
  }

  // Utility to check if user is online
  isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId);
  }

  // Send notification to specific user
  sendToUser(userId: string, event: string, data: any) {
    const userSocketSet = this.userSockets.get(userId);
    if (userSocketSet) {
      userSocketSet.forEach((socketId) => {
        this.server.to(socketId).emit(event, data);
      });
    }
  }
}
