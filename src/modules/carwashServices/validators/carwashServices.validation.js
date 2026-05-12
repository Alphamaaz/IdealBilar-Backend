import { z } from "zod";

// Vehicle Validation
const vehicleSchemaValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Vehicle name must be at least 2 characters")
    .max(50, "Vehicle name must not exceed 50 characters"),

  description: z
    .string()
    .trim()
    .max(200, "Vehicle description must not exceed 200 characters")
    .optional(),

  isActive: z.boolean().optional().default(true),
});

// Service Validation
const serviceValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Service name must be at least 3 characters")
    .max(100, "Service name must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(300, "Description must not exceed 300 characters")
    .optional(),

  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be positive"),

  duration: z
    .number({
      invalid_type_error: "Duration must be a number",
    })
    .int("Duration must be an integer")
    .positive("Duration must be positive")
    .optional()
    .default(30),

  isActive: z.boolean().optional().default(true),

  isPopular: z.boolean().optional().default(false),

  image: z.string().url("Image must be a valid URL").optional(),
});

// Category Validation
const categoryValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name must not exceed 100 characters")
    .optional(),

  services: z
    .array(serviceValidationSchema)
    .min(1, "At least one service is required"),

  isActive: z.boolean().optional().default(true),
});

// Extra Service Validation
const extraServiceValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Extra service name must be at least 2 characters")
    .max(100, "Extra service name must not exceed 100 characters"),

  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be positive"),

  isActive: z.boolean().optional().default(true),
});

// Main Validation Schema
const serviceCategoryValidationSchema = z.object({
  category: categoryValidationSchema,

  vehicleType: z
    .array(vehicleSchemaValidation)
    .min(1, "At least one vehicle type is required"),

  extraServices: z.array(extraServiceValidationSchema).optional().default([]),

  order: z
    .number({
      invalid_type_error: "Order must be a number",
    })
    .int("Order must be an integer")
    .optional()
    .default(0),
});

// Main Validator
export const validateCarWashServiceSchema = (data) => {
  return serviceCategoryValidationSchema.parse(data);
};

// Optional Individual Validators
export const validateServiceData = (data) => {
  return serviceValidationSchema.parse(data);
};

export const validateVehicleType = (data) => {
  return vehicleSchemaValidation.parse(data);
};

export const validateExtraService = (data) => {
  return extraServiceValidationSchema.parse(data);
};

export const validateCategoryData = (data) => {
  return categoryValidationSchema.parse(data);
};
