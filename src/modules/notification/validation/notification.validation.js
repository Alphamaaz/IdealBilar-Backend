import z from "zod";

const notificationValidation = z.object({
    name: z.string().min(1, 100).optional(),
    type: z.enum(["General", "Dovra", "Car Wash", "Buy Car", "Sell Car", "Rent a Car", "Workshop"]),
    message: z.string().min(1, "Message is required"),
    model: z.string().optional(),
    isRead: z.boolean().default(false),

});

export { notificationValidation };