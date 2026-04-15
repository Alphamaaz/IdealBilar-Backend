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

const buyACarValidationSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().regex(/[0-9]\d{1,14}$/, "Invalid phone number"),
  subject: z.string().max(100),
  message: z.string().max(300),
  strategy: strategySchema,
  lease: leaseSchema,
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
