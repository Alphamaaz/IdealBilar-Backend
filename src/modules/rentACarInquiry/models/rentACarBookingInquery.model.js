// External modules
import mongoose from "mongoose";

// rent A car Booking
const rentACarBookingSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentalCar",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    licenseImage: {
      type: String,
      required: true,
    },
    pickupLocation: {
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
    perDayRent: {
      type: Number,
      required: true,
    },
    
    totalRent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//export
export default mongoose.model("RentACarBooking", rentACarBookingSchema);
