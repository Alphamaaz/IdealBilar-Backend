//External modules

//Internal modules
import { getAllTestimonialRepository } from "../repositories/getAllTestimonial.repository.js";
const getAllTestimonialService = async () => {
    try {
        const result = await getAllTestimonialRepository();
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    getAllTestimonialService
}