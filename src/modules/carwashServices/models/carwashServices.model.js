import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,              
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number, // minutes
      default: 30,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
    },
    
  },
  {
    _id: true,
  },
);

const serviceCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      trim: true,
    },

    services: [serviceSchema],
    extraServices: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        price: {
          type: Number,
          required: true,
        },

        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ServiceCategory", serviceCategorySchema);
