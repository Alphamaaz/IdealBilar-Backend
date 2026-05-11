import { z } from "zod";

const extraServiceValidationSchema = z.object({
  name: z.string().min(2).max(50),

  price: z.number().positive(),

  isActive: z.boolean().optional(),
});

const carwashServiceValidationSchema = z.object({
  name: z.string().min(3).max(50),

  description: z.string().min(10).optional(),

  price: z.number().positive(),

  duration: z.number().positive().optional(),

  isActive: z.boolean().optional(),

  isPopular: z.boolean().optional(),

  image: z.string().url().optional(),

});

const serviceCategoryValidationSchema = z.object({
  categoryName: z.string().min(3).max(100).optional(),

  services: z.array(carwashServiceValidationSchema).min(1),
  extraServices: z.array(extraServiceValidationSchema).optional(),

  order: z.number().int().optional(),
});

export const validateCarWashServiceSchema = (data) => {
  return serviceCategoryValidationSchema.parse(data);
};
