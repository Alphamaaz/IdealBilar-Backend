import z from "zod";

const createWorkshopServiceValidation = z.object({
    serviceName: z.string().min(1, "Service name is required"),
    serviceDescription: z.string().min(1, "Service description is required"),
    serviceImage: z.string().optional(),
    serviceStatus: z.enum(["active", "inactive"]).default("active")
});

export { createWorkshopServiceValidation };
