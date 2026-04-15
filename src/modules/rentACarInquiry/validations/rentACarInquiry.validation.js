// External modules
import { z } from "zod";

// image schema
const imageSchema = z.object({
  url: z.coerce.string().max(255),
  isMain: z.boolean().optional().default(false),
  sortOrder: z.number().int().min(0).optional().default(0),
});

// date schema (fixed)
const dateSchema = z.coerce.date();

// Rent a car validation schema
const rentACarValidationSchema = z.object({
  image: imageSchema,

  pickupLocation: z.string().min(1, "Pickup location is required"),

  email: z.string().email("Invalid email format"),

  pickupDate: dateSchema,
  returnDate: dateSchema,

  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),

  perDayRent: z.coerce.number().min(0, "Per day rent must be >= 0"),

  totalDurationRent: z.coerce.number().min(1, "Duration must be at least 1 day"),

  totalRent: z.coerce.number().min(0, "Total rent must be >= 0"),
})
.refine((data) => data.returnDate > data.pickupDate, {
  message: "Return date must be after pickup date",
  Path: ["returnDate"],
})
.refine((data) => data.totalRent === data.totalDurationRent, {
  message: "Total rent is incorrect",
  Path: ["totalRent"],
});

// validation function
const rentACarDataValidationFunction = (rentACarData) => {
  return rentACarValidationSchema.safeParse(rentACarData);
};

// export
export { rentACarDataValidationFunction };