// //External modules
// import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema(
//   {
//    participants: [
//       {
//         userId: {
//           type: mongoose.Schema.Types.ObjectId,
//           required: true,
//         },
//         userType: {
//           type: String,
//           enum: ['User', 'Admin'],
//           required: true,
//         },
//       }
//     ],

//     // optional: last message reference for UI optimization
//     lastMessage: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Message",
//       default: null,
//     },

//     // optional: quick preview text
//     lastMessageText: {
//       type: String,
//       default: "",
//     },

//     lastMessageAt: {
//       type: Date,
//       default: null,
//     },

//     // optional: chat status
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// // ensures faster lookup for participant-based chat search
// chatSchema.index({ participants: 1 });

// //export
// export default mongoose.model("Chat", chatSchema);


import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  inquiryType: {
    type: String,
    enum: ['dovra', 'buyACar', 'carWash', 'rentACarInquiry', 'general'],
    required: true
  },
  inquiryId: { type: String, required: true },
  user: {
    id: String,
    name: String,
    email: String
  },
  admin: {
    id: String,
    name: String,
    assignedAt: Date
  },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  chatType: { type: String, default: 'one-to-one' },
  lastMessage: String,
  lastMessageAt: Date,
  lastMessageSender: String,
  userUnreadCount: { type: Number, default: 0 },
  adminUnreadCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

chatSchema.index({ inquiryType: 1, isActive: 1 });
chatSchema.index({ 'user.id': 1 });

export default mongoose.model("Chat", chatSchema);
