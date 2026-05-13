//External modules

//Internal modules
import testimonialModel from "../models/testimonial.model.js";
const deleteTestimonialRepository = async (Id) => {
    try {
        const result = await testimonialModel.findByIdAndDelete(Id);
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    deleteTestimonialRepository
}