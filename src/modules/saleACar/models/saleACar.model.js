import mongoose from "mongoose";

const saleACarImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const saleACarSchema = new mongoose.Schema(
  {
    vehicleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleInfo: {
      year: {
        type: Number,
        required: true,
      },
      brand: {
        type: String,
        required: true,
        trim: true,
      },
      model: {
        type: String,
        required: true,
        trim: true,
      },
      transmission: {
        type: String,
        required: true,
        trim: true,
      },
      mileage: {
        type: Number,
        required: true,
      },
    },
    condition: {
      mechanicalCondition: {
        type: String,
        enum: ["excellent", "good", "fair"],
        required: true,
      },
      exteriorBlemishes: {
        type: String,
        default: "",
        trim: true,
      },
      smokeFreeCabin: {
        type: Boolean,
        default: false,
      },
    },
    images: {
      type: [saleACarImageSchema],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length >= 4;
        },
        message: "At least 4 vehicle images are required",
      },
      required: true,
    },
    sellingPreferences: {
      wantToSell: {
        type: Boolean,
        default: false,
      },
      assignBrokerage: {
        type: Boolean,
        default: false,
      },
    },
    ownerInformation: {
      fullName: {
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
      preferredContact: {
        type: String,
        enum: ["email", "phone_call"],
        required: true,
      },
    },
    agreementAccepted: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "contacted", "closed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const SaleACar = mongoose.model("SaleACar", saleACarSchema);

export { SaleACar };
