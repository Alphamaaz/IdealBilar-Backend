import z from "zod";

const createWorkshopServiceValidation = z.object({
    name: z.string().min(1, "Service name is required"),
    description: z.string().min(1, "Service description is required"),
    image: z.string().optional(),
    status: z.enum(["active", "inactive"]).default("active")
});

export { createWorkshopServiceValidation };
