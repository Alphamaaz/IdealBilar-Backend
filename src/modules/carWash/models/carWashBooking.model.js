import mongoose from "mongoose";

const carWashBookingSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },
    selectedServices: {
      type: [String],
      required: true,
      default: [],
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedDurationHours: {
      type: Number,
      required: true,
    },
    totalEstimate: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "SEK",
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
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    carBrandAndModel: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    extraServices: [
      {
        serviceName: {  
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("CarWashBooking", carWashBookingSchema);
