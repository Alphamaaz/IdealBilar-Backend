// //External modules
// import mongoose from "mongoose";

// // backend/models/Message.js
// const messageSchema = new mongoose.Schema({
//   chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  
//   // Simple and effective way
//   senderType: {
//     type: String,
//     enum: ['user', 'admin'],
//     required: true,
//   },
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   senderName: String,
  
//   message: String,
//   timestamp: { type: Date, default: Date.now }
// });

// // optimize chat message loading
// messageSchema.index({ chatId: 1, createdAt: -1 });

// //export
// export default mongoose.model("Message", messageSchema);

// models/chatMessage.model.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true, index: true },
  sender: {
    id: String,
    type: { type: String, enum: ['user', 'admin'] },
    name: String
  },
  receiver: {
    id: String,
    type: { type: String, enum: ['user', 'admin'] },
    name: String
  },
  message: { type: String, required: true },
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  readAt: Date
}, { timestamps: true });

messageSchema.index({ chatId: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);