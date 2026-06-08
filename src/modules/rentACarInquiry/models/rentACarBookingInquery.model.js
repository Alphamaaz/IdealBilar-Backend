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
    phone: {
      type: String,
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
    weekendRent: {
      type: Number,
      default: 0,
    },
    isWeekendRateApplied: {
      type: Boolean,
      default: false,
    },
    deductibleReductionSelected: {
      type: Boolean,
      default: false,
    },
    deductibleReductionPerDay: {
      type: Number,
      default: 120,
    },
    deductibleReductionTotal: {
      type: Number,
      default: 0,
    },
    
    totalRent: {
      type: Number,
      required: true,
    },
      status: {
      type: String,
      enum: ["upcoming", "in-progress", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  },
);

// Static method to find booked dates for a car in a given month
rentACarBookingSchema.statics.findBookedDates = function(carId, monthStart, monthEnd, statusFilter = []) {
  const query = {
    carId,
    pickupDate: { $lt: monthEnd },
    returnDate: { $gt: monthStart }
  };

  if (statusFilter && statusFilter.length > 0) {
    query.status = { $in: statusFilter };
  }

  return this.find(query);
};

//export
export default mongoose.model("RentACarBooking", rentACarBookingSchema);
