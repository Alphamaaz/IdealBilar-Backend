import express from 'express';
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import { adminOnlyMiddleware } from '../../../shared/middlewares/adminOnlyAuth.moddleware.js';
import {
  getInquiryChatController,
  getAdminChatsController,
  getUserChatsController,
  markChatAsReadController,
  getTotalUnreadCountController,
  debugUnreadCountController,
  debugChatMessagesController,
} from '../controllers/chat.controller.js';

const chatRouter = express.Router();

// Fetch chat + message history for a specific inquiry (user sees own, admin sees all)
chatRouter.get('/chat/inquiry/:inquiryId', middlewareForVerifyJwtToken, getInquiryChatController);

// Admin: list all chats, optionally filtered by inquiryType
chatRouter.get('/admin/chats', middlewareForVerifyJwtToken, adminOnlyMiddleware, getAdminChatsController);

// User: list own chats, optionally filtered by inquiryType
chatRouter.get('/my-chats', middlewareForVerifyJwtToken, getUserChatsController);

// Debug endpoint - shows detailed unread count breakdown (Admin only) - MUST BE BEFORE /unread-count
chatRouter.get('/chats/unread-count/debug', middlewareForVerifyJwtToken, adminOnlyMiddleware, debugUnreadCountController);

// Get total unread message count
chatRouter.get('/chats/unread-count', middlewareForVerifyJwtToken, getTotalUnreadCountController);

// Debug endpoint - shows all messages in a specific chat with their receiver info
chatRouter.get('/chats/:chatId/debug', middlewareForVerifyJwtToken, debugChatMessagesController);

// Mark all messages in a chat as read for the calling user
chatRouter.patch('/chat/:chatId/read', middlewareForVerifyJwtToken, markChatAsReadController);

export { chatRouter as chatRouterHandler };
