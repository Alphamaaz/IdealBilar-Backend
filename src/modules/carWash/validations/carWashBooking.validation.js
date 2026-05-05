import { z } from "zod";

const bookingDateSchema = z.coerce.date();

const carWashBookingValidationSchema = z.object({
  vehicleType: z.string().min(2).max(100),
  selectedServices: z
    .array(z.string().min(1))
    .min(1, "Select at least one car wash service"),
  bookingDate: bookingDateSchema,
  bookingTime: z.string().min(3).max(20),
  estimatedDurationHours: z.coerce.number().gt(0, "Duration must be greater than 0"),
  totalEstimate: z.coerce.number().min(0, "Total estimate must be greater than or equal to 0"),
  currency: z.string().min(3).max(10).optional().default("SEK"),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email(),
  phoneNumber: z.string().regex(/^[+0-9()\-\s]{7,20}$/, "Invalid phone number"),
  carBrandAndModel: z.string().min(2).max(150),
  message: z.string().max(1000).optional().default(""),
  extraServices: z.array(
    z.object({
      serviceName: z.string().min(1).max(100),
      price: z.coerce.number().min(0),
    })
  ).optional().default([]),
});

const bookingDateLookupValidationSchema = z.object({
  bookingDate: bookingDateSchema,
});

const carWashBookingValidation = (bookingData) =>
  carWashBookingValidationSchema.safeParse(bookingData);

const carWashBookingDateLookupValidation = (lookupData) =>
  bookingDateLookupValidationSchema.safeParse(lookupData);

export {
  carWashBookingValidation,
  carWashBookingDateLookupValidation,
};
