// External modules
import mongoose from "mongoose";

// rent A car Booking
const rentACarBookingSchema = new mongoose.Schema(
  {
    // carId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Car",
    //   required: true,
    // },
    pickupLocation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed", "Available"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

//export
export default mongoose.model("RentACarBooking", rentACarBookingSchema);
