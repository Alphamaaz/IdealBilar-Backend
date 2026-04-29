import { z } from "zod";

const saleACarImageSchema = z.object({
  url: z.string().min(1, "Image URL is required"),
  fileName: z.string().min(1, "Image file name is required"),
  isMain: z.boolean(),
  sortOrder: z.number().int().min(0, "Image sort order cannot be negative"),
});

const saleACarValidationSchema = z
  .object({
    year: z.coerce
      .number()
      .int("Year must be a whole number")
      .min(1900, "Year must be 1900 or later")
      .max(2100, "Year is invalid"),
    brand: z.string().trim().min(1, "Brand is required"),
    model: z.string().trim().min(1, "Model is required"),
    transmission: z.string().trim().min(1, "Transmission is required"),
    mileage: z.coerce
      .number()
      .min(0, "Mileage cannot be negative"),
    mechanicalCondition: z.enum(["excellent", "good", "fair"], {
      errorMap: () => ({
        message: "Mechanical condition must be excellent, good, or fair",
      }),
    }),
    exteriorBlemishes: z.string().trim().optional().default(""),
    smokeFreeCabin: z.boolean(),
    images: z
      .array(saleACarImageSchema)
      .min(4, "At least 4 vehicle images are required"),
    wantToSell: z.boolean(),
    assignBrokerage: z.boolean(),
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z.string().trim().email("A valid email address is required"),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^\+?[0-9()\-\s]{7,20}$/, "A valid phone number is required"),
    preferredContact: z.enum(["email", "phone_call"], {
      errorMap: () => ({
        message: "Preferred contact must be email or phone_call",
      }),
    }),
    agreementAccepted: z.boolean(),
  })
  .refine((data) => data.wantToSell || data.assignBrokerage, {
    message: "Select at least one selling preference",
    path: ["wantToSell"],
  })
  .refine((data) => data.agreementAccepted, {
    message: "You must accept the terms before submitting",
    path: ["agreementAccepted"],
  });

const saleACarValidation = (saleACarData) => {
  return saleACarValidationSchema.safeParse(saleACarData);
};

export { saleACarValidation };
