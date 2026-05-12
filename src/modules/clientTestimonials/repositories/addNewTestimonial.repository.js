//Exertnal modules

//Internal modules
import testimonialModel from "../models/testimonial.model.js";
const addNewTestimonialRepository = async (testimonialData) => {
    try {
        const result = await testimonialModel.create(testimonialData);
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    addNewTestimonialRepository
}