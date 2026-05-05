// External modules
import mongoose from "mongoose";

// Query History Schema - Tracks all user queries/searches across the platform
const queryHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for faster lookups
    },
    queryType: {
      type: String,
      enum: [
        "buy_car",
        "sell_car",
        "rent_car",
        "car_wash",
        "workshop_service",
        "dovra_inquiry",
        "contact_us",
        "search",
        "filter",
        "view",
        "other",
      ],
      required: true,
      index: true,
    },
    module: {
      type: String,
      enum: [
        "buyACar",
        "saleACar",
        "rentalCar",
        "carWash",
        "workshopServices",
        "Dovra",
        "contactus",
        "general",
      ],
      required: true,
    },
    searchQuery: {
      type: String,
      default: null, // For search/filter queries
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}, // Any additional custom data
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
    notes: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// Index for efficient queries
queryHistorySchema.index({ userId: 1, createdAt: -1 });
queryHistorySchema.index({ queryType: 1, createdAt: -1 });
queryHistorySchema.index({ module: 1, createdAt: -1 });

// Export model
export default mongoose.model("QueryHistory", queryHistorySchema);
