//External modules

//Internal modules
import testimonialModel from "../models/testimonial.model.js";
const updateTestimoinalRepository = async (Id,testimonialData) => {
    try {
        console.log("Check the update ", testimonialData);
        
        const result = await testimonialModel.findByIdAndUpdate(Id, testimonialData, { returnDocument: 'after' });
        return result;
    } catch (error) {
        throw error;
    }
}

//export 
export {
    updateTestimoinalRepository
}