import mongoose from "mongoose";

const userOTPVerifySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["email_verification", "forgot_password"],
    required: true,
  },
  expireAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

userOTPVerifySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
userOTPVerifySchema.index({ userId: 1, purpose: 1 }, { unique: true });

export default mongoose.model("UserOTPVerify", userOTPVerifySchema);
