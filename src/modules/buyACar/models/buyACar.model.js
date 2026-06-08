// External modules
import mongoose from "mongoose";



// Mongoose schema
const buyACarSchema = new mongoose.Schema(
  {
    carData: {
        type:  mongoose.Schema.Types.Mixed,
        required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /[0-9]\d{1,14}$/.test(v);
        },
        message: "Invalid phone number",
      },
    },
    subject: {
      type: String,
      required: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: true,
      maxlength: 300,
    },
    strategy: {
      type: {
        vehiclePrice: Number,
        deliveryAndHandlingFee: Number,
        totalEstimate: Number,
      },
      default: null,
    },
    lease: {
      type: {
        monthlyCost: Number,
        downPayment: Number,
        refund: Number,
        residualDebt: Number,
        interest: Number,
        effectiveInterest: Number,
        setupFee: Number,
        totalEstimate: Number,
      },
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    // Custom validation: exactly one of strategy or lease must be provided (and not null)
    validate: {
      validator: function (doc) {
        const hasStrategy = doc.strategy !== null && doc.strategy !== undefined;
        const hasLease = doc.lease !== null && doc.lease !== undefined;
        return (hasStrategy && !hasLease) || (!hasStrategy && hasLease);
      },
      message: "Either 'strategy' or 'lease' must be provided, but not both.",
    },
  },
);

// Create and export model
const BuyACar = mongoose.model("BuyACar", buyACarSchema);

export { BuyACar };
