import express from 'express';
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import { adminOnlyMiddleware } from '../../../shared/middlewares/adminOnlyAuth.moddleware.js';
import {
  getInquiryChatController,
  getAdminChatsController,
  getUserChatsController,
  markChatAsReadController,
} from '../controllers/chat.controller.js';

const chatRouter = express.Router();

// Fetch chat + message history for a specific inquiry (user sees own, admin sees all)
chatRouter.get('/chat/inquiry/:inquiryId', middlewareForVerifyJwtToken, getInquiryChatController);

// Admin: list all chats, optionally filtered by inquiryType
chatRouter.get('/admin/chats', middlewareForVerifyJwtToken, adminOnlyMiddleware, getAdminChatsController);

// User: list own chats, optionally filtered by inquiryType
chatRouter.get('/my-chats', middlewareForVerifyJwtToken, getUserChatsController);

// Mark all messages in a chat as read for the calling user
chatRouter.patch('/chat/:chatId/read', middlewareForVerifyJwtToken, markChatAsReadController);

export { chatRouter as chatRouterHandler };
