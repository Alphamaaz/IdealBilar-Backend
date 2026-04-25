//External midules

//Internal modules
import Chat from '../models/chat.model.js';

const findChatByIdAndCreateRepository = async (ids, currentUser) => {

  console.log("We are in the find chat repository check AdminId ", ids.AdminId );
  console.log("We are in the find chat repository check final chat Id ", ids.finalChatId );
  console.log("We are in the find chat repository check client user Id ", ids.clientUserId);
  
    try {
        let chat = await Chat.findById(ids.finalChatId);
        if (!chat) {
        // Try to find by custom ID or create new
        chat = await Chat.findOne({ _id: ids.finalChatId });
        
        if (!chat) {
          // Create new chat document
          chat = new Chat({
            _id: ids.finalChatId, // Use the provided chatId
            user: {
              id: ids.clientUserId || userId || socket.id,
              name: currentUser.name,
              email: currentUser.email
            },
            admin: {
              id: ids.AdminId || "admin_default",
              name: "Admin",
              assignedAt: new Date()
            },
            status: 'active',
            chatType: 'one-to-one'
          });
          chat = await chat.save();
          console.log("Created new chat document:", chat._id);
        }
      }
      return chat;
    } catch (error) {
        throw error;
    }
}

//export
export {
    findChatByIdAndCreateRepository
}