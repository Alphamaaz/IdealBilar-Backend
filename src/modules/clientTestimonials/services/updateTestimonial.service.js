//External modules

//Internal modules
import { updateTestimoinalRepository } from "../repositories/updateTestimonial.repository.js";
const updateTestimonialService = async (Id, testimonialData) => {
    try {
        const result = await updateTestimoinalRepository(Id, testimonialData);
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    updateTestimonialService
}