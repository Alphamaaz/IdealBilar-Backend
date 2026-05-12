//External modules

//Internal modules
import { addNewTestimonialRepository } from "../repositories/addNewTestimonial.repository.js"
const adminAddNewTestimonialService = async (testimonialData) => {
    try {
        const result = await addNewTestimonialRepository(testimonialData);
        return result;
    } catch (error) {
        throw error
    }
}

//export
export {
    adminAddNewTestimonialService
}