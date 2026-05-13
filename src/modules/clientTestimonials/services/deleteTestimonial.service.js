//External modules

//Internal modules
import { deleteTestimonialRepository } from "../repositories/deleteTestimonial.repository.js";
const deleteTestimonialService = async (Id) => {
    try {
        const result = await deleteTestimonialRepository(Id);
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    deleteTestimonialService
}