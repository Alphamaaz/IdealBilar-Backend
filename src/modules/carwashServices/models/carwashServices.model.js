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

const vehicleSchema = new mongoose.Schema(
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: true,
  },
);


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    
    services: [serviceSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const serviceCategorySchema = new mongoose.Schema(
  {
    
    category: categorySchema,
    vehicleType: [vehicleSchema], 
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ServiceCategory", serviceCategorySchema);
