import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: String,
  fileName: String,
  isMain: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
});

const DealerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  city: String,
  address: String,
});

const CarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Mercedes-Benz GLS 400d.

    make: String, // Mercedes-Benz
    model: String, // GLS 400d
    variant: String, // AMG Line

    year: Number,
    mileage: Number,
    power: Number, // HP
    seats: Number,

    fuel: String,
    transmission: String,
    vehicleType: String, // SUV

    color: String,

    pricing: {
      perDay: Number,
      perWeek: Number,
      perMonth: Number,
      currency: { type: String, default: "SEK" },
    },

    description: String,

    features: [String], // all those checkboxes (ACC, GPS, etc.)

    images: [ImageSchema],

    thumbnail: String, // main image

    dealer: DealerSchema,

    location: String, // Uddevalla

    status: { type: String, enum: ["available", "rented", "maintenance","booked","sold"], default: "available" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);


export default mongoose.model("RentalCar", CarSchema);
