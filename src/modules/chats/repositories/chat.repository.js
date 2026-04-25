// External modules

// Internal modules
import Chat from '../models/chat.model.js'
const chatRespository = async(userId, adminId) => {
    try {
        const chatRepository = await Chat.findOne({
              participants: { $all: [userId, adminId] },
            })
              .populate("participants", "-password")
              .populate("lastMessage");
        
        return chatRepository;
    } catch (error) {
        throw error;
    }
}

//export
export {
    chatRespository
}