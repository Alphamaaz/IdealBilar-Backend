//External modules

//Internal modules
import testimonialModel from "../models/testimonial.model.js"
const getAllTestimonialRepository = async () => {
    try {
        const result = await testimonialModel.find().sort({createdAt: -1});
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    getAllTestimonialRepository
}