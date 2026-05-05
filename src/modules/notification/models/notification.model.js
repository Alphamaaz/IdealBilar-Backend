import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["General", "Dovra", "Car Wash", "Buy Car", "Sell Car", "Rent a Car", "Workshop"],
      default: "General",
    },
    message: {
      type: String,
      required: true,
      default: "has sent inquiry about",
    },
    model: {
      type: String,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    recipientId: {
      type: String,
    },
    recipientType: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);
export { Notification };