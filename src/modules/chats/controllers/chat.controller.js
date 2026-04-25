// External modules

// Internal modules
import { chatService } from "../services/sendMessage.service.js";
import Chat from '../models/chat.model.js'
const chatController = async (req, res) => {
   try {
    const { userId, adminId } = req.headers;

    if (!userId || !adminId) {
      return res.status(400).json({
        success: false,
        message: "userId and adminId are required",
      });
    }

    // Check if chat already exists
    let chat = await chatService(userId, adminId);
    // If not, create new chat
    if (!chat) {
      chat = await Chat.create({
        participants: [userId, adminId],
      });

      chat = await Chat.findById(chat._id).populate(
        "participants",
        "-password"
      );
    }

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//export
export {
    chatController
}