//External modules

//Internal modules
import { deleteTestimonialService } from "../services/deleteTestimonial.service.js";
const deleteTestimonialController = async (req, res) => {
    try {
        const testimonialId = req.params.testimonialId;
        const result = await deleteTestimonialService(testimonialId);
        res.status(200).json({
            succes: true, 
            message: "Delete the Testimonial Successfully!",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//export
export default deleteTestimonialController;