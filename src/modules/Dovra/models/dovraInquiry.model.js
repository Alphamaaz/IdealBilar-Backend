import mongoose from "mongoose";

const dovraInquirySchema = new mongoose.Schema(
  {
    carImage:{
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    interestedIn: {
      type: [String],
      required: true,
      default: [],
    },
    closestDealer: {
      type: String,
      required: true,
      trim: true,
    },
    inquiryPreferences: {
      wantToOrderDovra: {
        type: Boolean,
        default: false,
      },
      getMoreInformation: {
        type: Boolean,
        default: false,
      },
      bookShowingInPerson: {
        type: Boolean,
        default: false,
      },
    },
    consent: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "completed", "closed", "cancelled"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("DovraInquiry", dovraInquirySchema);
