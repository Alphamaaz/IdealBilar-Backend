import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: String, // stored path from multer
  isMain: { type: Boolean, default: false },
  sortOrder: Number,
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

    fuel: String,
    gearbox: String,
    vehicleType: String, // SUV

    color: String,

    price: {
      value: Number,
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