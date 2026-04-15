import { z } from "zod";

const imageSchema = z.object({
  url: z.string().min(1).max(500),
  fileName: z.string().min(1).max(255).optional(),
  isMain: z.boolean().optional().default(false),
  sortOrder: z.number().int().min(0).optional().default(0),
});

const dealerSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  city: z.string().min(2).max(100).optional(),
  address: z.string().min(5).max(255).optional(),
});

const pricingSchema = z.object({
  perDay: z.number().min(0).optional(),
  perWeek: z.number().min(0).optional(),
  perMonth: z.number().min(0).optional(),
  currency: z.string().min(3).max(10).optional().default("SEK"),
}).refine(
  (pricing) =>
    pricing.perDay !== undefined ||
    pricing.perWeek !== undefined ||
    pricing.perMonth !== undefined,
  {
    message: "At least one rental price is required",
  },
);

const rentalCarBaseSchema = z.object({
  title: z.string().min(2).max(100),
  make: z.string().min(2).max(100),
  model: z.string().min(1).max(100),
  variant: z.string().min(1).max(100).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  mileage: z.number().min(0).optional(),
  power: z.number().min(0).optional(),
  seats: z.number().int().min(1).optional(),
  fuel: z.string().min(2).max(50).optional(),
  transmission: z.string().min(2).max(50).optional(),
  vehicleType: z.string().min(2).max(50).optional(),
  color: z.string().min(2).max(50).optional(),
  pricing: pricingSchema,
  description: z.string().max(5000).optional(),
  features: z.array(z.string().min(1).max(100)).optional(),
  images: z.array(imageSchema).optional(),
  thumbnail: z.string().min(1).max(500).optional(),
  dealer: dealerSchema.optional(),
  location: z.string().min(2).max(100).optional(),
  status: z.enum(["available", "rented", "maintenance", "booked", "sold"]).optional().default("available"),
  isFeatured: z.boolean().optional().default(false),
});

const createRentalCarSchema = rentalCarBaseSchema;
const updateRentalCarSchema = rentalCarBaseSchema.partial();

const rentalcarValidation = (rentalCarData) => {
  try {
    return createRentalCarSchema.safeParse(rentalCarData);
  } catch (err) {
    console.log("Error in create rental car validation ", err);
    throw new Error("Invalid rental car data");
  }
};

const rentalCarUpdateValidation = (rentalCarData) => {
  try {
    return updateRentalCarSchema.safeParse(rentalCarData);
  } catch (err) {
    console.log("Error in update rental car validation ", err);
    throw new Error("Invalid rental car data");
  }
};


export {
  rentalcarValidation,
  rentalCarUpdateValidation,
};
