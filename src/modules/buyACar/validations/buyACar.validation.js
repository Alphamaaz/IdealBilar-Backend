// External modules
import { z } from "zod";

// Internal modules

// strategy schema
const strategySchema = z
  .object({
    vehiclePrice: z.coerce.number(),
    deliveryAndHandlingFee: z.coerce.number(),
    totalEstimate: z.coerce.number(),
  })
  .refine(
    (data) =>
      data.totalEstimate === data.vehiclePrice + data.deliveryAndHandlingFee,
    {
      message: "Strategy total estimate is incorrect",
      path: ["totalEstimate"],
    },
  );

// lease schema
const leaseSchema = z
  .object({
    monthlyCost: z.coerce.number(),
    downPayment: z.coerce.number(),
    refund: z.coerce.number(),
    residualDebt: z.coerce.number(),
    interest: z.coerce.number(),
    effectiveInterest: z.coerce.number(),
    setupFee: z.coerce.number(),
    totalEstimate: z.coerce.number(),
  })
//   .refine(
//     (data) => {
//       const calculated =
//         ((data.monthlyCost * data.refund) + (data.downPayment + data.setupFee));
//       return data.totalEstimate >= calculated;
//     },
//     {
//       message: "Lease total estimate seems incorrect",
//       path: ["totalEstimate"],
//     },
//   );

//car features schema
const carFeatureSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  value: z.string().optional(),
  icon: z.string().url().optional()
})

const carFeaturesSchema = z.array(carFeatureSchema).optional().default([]);

//Car schema
const carSchema = z.object({
    name: z.string().max(500, "Car name cannot exceed 500 characters"),
    mileage: z.string().min(1, "Mileage is required"),
    power: z.number().positive("Power must be a positive number"),
    seats: z.number().int().positive("Seats must be a positive integer"),
    color: z.string().min(1, "Color is required"),
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    vehicleType: z.string().min(1, "Vehicle type is required"),
    gearbox: z.string().min(1, "Gearbox is required"),
    fuel: z.string().min(1,"Fuel type is required"),
    description: z.string().optional(),
    features: carFeaturesSchema,
    thumbnail: z.string().url("Thumbnail must be a vaild URL")
})

const buyACarValidationSchema = z.object({
  carData: carSchema,
  userId: z.string().min(1,"User ID is required"),
  name: z.string().min(1, "User Name is required"),
  phoneNumber: z.string().regex(/[0-9]\d{1,14}$/, "Invalid phone number"),
  subject: z.string().max(100, "Subject cannnot exceed 100 characters"),
  message: z.string().max(300, "Message cannot excced 300 characters"),
  strategy: strategySchema.optional(),
  lease: leaseSchema.optional(),
})
.refine((data)=>{
    return (
        (data.strategy && !data.lease) ||
        (!data.strategy && data.lease)
    )
},
{
    message: "Either strategy or lease must be provided (not both)",
      path: ["strategy"]
});

// buy a car data validation function

const buyACarDataValidation = (buyACarData) => {
  try {
    return buyACarValidationSchema.safeParse(buyACarData);
  } catch (error) {
    console.log("Error occur in the buy a car validation ",error);
    throw new Error(error);
  }
};

// export

export { buyACarDataValidation };
