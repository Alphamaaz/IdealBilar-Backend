import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url().max(255),
  isMain: z.boolean().optional().default(false),
  sortOrder: z.number().int().min(0).optional().default(0),
});

const dealerSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().min(3).max(30).optional(),
  email: z.email().optional(),
  city: z.string().min(2).max(100).optional(),
  address: z.string().min(5).max(255).optional(),
});

const createRentalCarSchema = z.object({
  title: z.string().min(2).max(100),
  make: z.string().min(2).max(100).optional(),
  model: z.string().min(1).max(100).optional(),
  variant: z.string().min(1).max(100).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  mileage: z.number().min(0).optional(),
  power: z.number().min(0).optional(),
  fuel: z.string().min(2).max(50).optional(),
  gearbox: z.string().min(2).max(50).optional(),
  vehicleType: z.string().min(2).max(50).optional(),
  color: z.string().min(2).max(50).optional(),
  price: z.object({
    value: z.number().min(0),
    currency: z.string().min(3).max(10).optional().default("SEK"),
  }).optional(),
  description: z.string().max(5000).optional(),
  features: z.array(z.string().min(1).max(100)).optional(),
  images: z.array(imageSchema).optional(),
  thumbnail: z.string().url().max(255).optional(),
  dealer: dealerSchema.optional(),
  location: z.string().min(2).max(100).optional(),
  status: z.enum(["available", "rented", "maintenance", "booked", "sold"]).optional().default("available"),
  isFeatured: z.boolean().optional().default(false),
});

const rentalcarValidation = (rentalCarData) => {
  try {
    return createRentalCarSchema.safeParse(rentalCarData);
  } catch (err) {
    console.log("Error in create rental car validation ", err);
    throw new Error("Invalid rental car data");
  }
};


export {
  rentalcarValidation,
};
