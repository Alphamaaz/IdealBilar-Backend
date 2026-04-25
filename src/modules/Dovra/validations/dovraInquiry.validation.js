import { z } from "zod";

const interestedInSchema = z
  .union([
    z.string().min(1),
    z.array(z.string().min(1)),
  ])
  .transform((value) => (Array.isArray(value) ? value : [value]));

const dovraInquiryValidationSchema = z
  .object({
    carImage: z.string().min(1, "Car image is required"),
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    email: z.string().email(),
    country: z.string().min(2).max(100),
    phoneNumber: z.string().regex(/^[+0-9()\-\s]{7,20}$/, "Invalid phone number"),
    interestedIn: interestedInSchema,
    closestDealer: z.string().min(2).max(200),
    wantToOrderDovra: z.coerce.boolean().optional().default(false),
    getMoreInformation: z.coerce.boolean().optional().default(false),
    bookShowingInPerson: z.coerce.boolean().optional().default(false),
    consent: z.coerce.boolean().refine((value) => value === true, {
      message: "Consent is required",
    }),
  })
  .refine(
    (data) =>
      data.wantToOrderDovra ||
      data.getMoreInformation ||
      data.bookShowingInPerson,
    {
      message: "Select at least one inquiry option",
      path: ["wantToOrderDovra"],
    },
  );

const dovraInquiryValidation = (inquiryData) =>
  dovraInquiryValidationSchema.safeParse(inquiryData);

export { dovraInquiryValidation };
