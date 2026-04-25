//External modules

//Internal modules
import Chat from '../models/chat.model.js';

const findChatsRepository = async () => {
    try {
        const activeChats = await Chat.find({ 
                status: 'active',
                isActive: true 
              }).sort({ lastMessageAt: -1 });
        return activeChats;
    } catch (error) {
        throw error;
    }
}

//export
export {
    findChatsRepository
}