// import { Server } from 'socket.io';
// import http from 'http';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { ChatService } from '@/services/user/chatService';

// const chatService = new ChatService();
// const userSocketMap = new Map();

// // ✅ Function to verify token
// const verifySocketToken = (token: string) => {
//   try {
//     const secret = process.env.JWT_ACESSTOKEN; // Ensure this is defined in .env

//     if (!secret) throw new Error('JWT secret is not set');

//     const decoded = jwt.verify(token, secret) as JwtPayload;
//     return decoded;
//   } catch (error) {
//     console.error('JWT verification failed:');
//     throw new Error('Invalid or expired token');
//   }
// };

// // ✅ Setup Socket Server
// export const setupSocketServer = (server: http.Server) => {
//   console.log("✅ Socket.IO server is being initialized..."); 
//   const io = new Server(server, {
//     cors: {
//       origin: process.env.FRONTEND_URL || "http://localhost:5173",
//       methods: ["GET", "POST"]
//     }
//   });

//   // ✅ Socket middleware for authentication
//   io.use((socket, next) => {
//     try {
//       const token = socket.handshake.auth.token; // Extract token from handshake
//       console.log(token,'hooppee')
//       if (!token) return next(new Error('Authentication error: No token provided'));

//       const decoded = verifySocketToken(token);
//       socket.data.userId = decoded.id; // Store userId for later use
//       next();
//     } catch (error) {
//       next(new Error('Authentication error'));
//     }
//   });

//   io.on('connection', (socket) => {
//     console.log('hhhhhhhhhhhhhhhhhhhhh❤️❤️❤️❤️')
//     console.log(`User connected: ${socket.data.userId}`);
//     userSocketMap.set(socket.data.userId, socket.id);
//     // ✅ Handle joining conversations
//     socket.on('join-conversation', (conversationId) => {
//       socket.join(conversationId);
//       console.log(`User ${socket.data.userId} joined conversation ${conversationId}`);
//     });

//     // ✅ Handle sending messages
//     socket.on('send-message', async (data) => {
//       try {
//         const { conversationId, text } = data;
//         const message = await chatService.sendMessage(conversationId, socket.data.userId, text);

//         io.to(conversationId).emit('receive-message', {
//           ...message.toObject(),
//           createdAt: new Date(),
//         });

//         // ✅ Notify the other participant
//         const conversation = await chatService.conversationRepository.findById(conversationId);
//         if (conversation) {
//           const otherParticipantId = conversation.participants.find(p => p.toString() !== socket.data.userId)?.toString();
//           if (otherParticipantId && userSocketMap.has(otherParticipantId)) {
//             io.to(userSocketMap.get(otherParticipantId)).emit('new-message-notification', {
//               conversationId,
//               message: text,
//               sender: socket.data.userId
//             });
//           }
//         }
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     });

//     // ✅ Typing indicator
//     socket.on('typing', (conversationId) => {
//       socket.to(conversationId).emit('user-typing', { userId: socket.data.userId, conversationId });
//     });

//     socket.on('stop-typing', (conversationId) => {
//       socket.to(conversationId).emit('user-stop-typing', { userId: socket.data.userId, conversationId });
//     });

//     // ✅ Mark messages as read
//     socket.on('mark-read', async (conversationId) => {
//       try {
//         await chatService.messageRepository.markAsRead(conversationId, socket.data.userId);
//         socket.to(conversationId).emit('messages-read', { conversationId, userId: socket.data.userId });
//       } catch (error) {
//         console.error('Error marking messages as read:', error);
//       }
//     });

//     // ✅ Handle disconnect
//     socket.on('disconnect', () => {
//       console.log(`User disconnected: ${socket.data.userId}`);
//       userSocketMap.delete(socket.data.userId);
//     });
//   });

//   return io;
// };
