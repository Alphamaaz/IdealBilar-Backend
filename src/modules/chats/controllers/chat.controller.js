import { getInquiryChatService } from '../services/getInquiryChat.service.js';
import { getAdminChatsService, getUserChatsService } from '../services/getAdminChats.service.js';
import { markMessagesReadService } from '../services/markMessagesRead.service.js';
import { getTotalUnreadCountService } from '../services/getTotalUnreadCount.service.js';
import { debugUnreadCountService } from '../services/debugUnreadCount.service.js';
import { debugChatMessagesService } from '../services/debugChatMessages.service.js';
import Chat from '../models/chat.model.js';

// GET /api/v1/chat/inquiry/:inquiryId
const getInquiryChatController = async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const callerRole = req.user?.role === 'admin' ? 'admin' : 'user';

    const result = await getInquiryChatService(inquiryId, callerRole);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Chat not found for this inquiry' });
    }

    // Non-admin users may only access their own chat
    if (callerRole !== 'admin' && result.user?.id !== req.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/admin/chats?inquiryType=dovra&page=1&limit=20
const getAdminChatsController = async (req, res) => {
  try {
    const { inquiryType, page = 1, limit = 20 } = req.query;
    const { chats, total } = await getAdminChatsService({
      inquiryType: inquiryType || null,
      page: Number(page),
      limit: Number(limit),
    });

    const formatted = chats.map((c) => ({
      chatId: c._id,
      inquiryType: c.inquiryType,
      status: c.status,
      user: c.user,
      lastMessage: c.lastMessage || null,
      lastMessageAt: c.lastMessageAt || null,
      lastMessageSender: c.lastMessageSender || null,
      unreadCount: c.adminUnreadCount,
    }));

    return res.status(200).json({
      success: true,
      data: {
        chats: formatted,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/my-chats?inquiryType=dovra&page=1&limit=20
const getUserChatsController = async (req, res) => {
  try {
    const { inquiryType, page = 1, limit = 20 } = req.query;

    const { chats, total } = await getUserChatsService({
      userId: req.userId,
      inquiryType: inquiryType || null,
      page: Number(page),
      limit: Number(limit),
    });

    const formatted = chats.map((c) => ({
      chatId: c._id,
      inquiryType: c.inquiryType,
      status: c.status,
      user: c.user,
      lastMessage: c.lastMessage || null,
      lastMessageAt: c.lastMessageAt || null,
      lastMessageSender: c.lastMessageSender || null,
      unreadCount: c.userUnreadCount,
    }));

    return res.status(200).json({
      success: true,
      data: {
        chats: formatted,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/chat/:chatId/read
const markChatAsReadController = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    const userType = req.user?.role === 'admin' ? 'admin' : 'user';

    if (userType !== 'admin' && chat.user?.id !== req.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await markMessagesReadService(chatId, req.userId, userType);
    return res.status(200).json({ success: true, message: 'Messages marked as read' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/chats/unread-count
const getTotalUnreadCountController = async (req, res) => {
  try {
    const userType = req.user?.role === 'admin' ? 'admin' : 'user';
    const totalUnreadCount = await getTotalUnreadCountService(req.userId, userType);

    return res.status(200).json({
      success: true,
      data: {
        totalUnreadCount
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/chats/unread-count/debug (Admin only - for debugging)
const debugUnreadCountController = async (req, res) => {
  try {
    const userType = req.user?.role === 'admin' ? 'admin' : 'user';
    
    if (userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const debugData = await debugUnreadCountService(req.userId, userType);

    return res.status(200).json({
      success: true,
      data: debugData
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/chats/:chatId/debug (Debug specific chat messages)
const debugChatMessagesController = async (req, res) => {
  try {
    const { chatId } = req.params;
    
    const debugData = await debugChatMessagesService(chatId, req.userId);

    return res.status(200).json({
      success: true,
      data: debugData
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { getInquiryChatController, getAdminChatsController, getUserChatsController, markChatAsReadController, getTotalUnreadCountController, debugUnreadCountController, debugChatMessagesController };
