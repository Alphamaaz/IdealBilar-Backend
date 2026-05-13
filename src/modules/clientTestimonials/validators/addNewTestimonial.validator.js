//External modules
import {z} from 'zod';
//Internal modules
const testimonialValidationSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(5),
    date: z.date(),
    rating: z.number(),
})
const adminAddNewTestimonialValidation = (testimonialData) => {
    try {
        return testimonialValidationSchema.safeParse(testimonialData);
    } catch (error) {
        throw error;
    }
}

//export
export {
    adminAddNewTestimonialValidation
}