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
  carId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid rental car ID"),
  licenseImage: imageSchema,

  pickupLocation: z.string().min(1, "Pickup location is required"),


  pickupDate: dateSchema,
  returnDate: dateSchema,

  perDayRent: z.coerce.number().min(0, "Per day rent must be >= 0"),

  totalRent: z.coerce.number().min(0, "Total rent must be >= 0"),
})
.refine((data) => data.returnDate > data.pickupDate, {
  message: "Return date must be after pickup date",
  path: ["returnDate"],
});

// validation function
const rentACarDataValidationFunction = (rentACarData) => {
  return rentACarValidationSchema.safeParse(rentACarData);
};

// export
export { rentACarDataValidationFunction };
