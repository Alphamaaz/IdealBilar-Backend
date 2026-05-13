//External modules

//Internal modules
import { updateTestimonialService } from "../services/updateTestimonial.service.js"
const updateTestimonialController = async (req, res) => {
    try {
        const Id = req.params.testimonialId;
        const result = await updateTestimonialService(Id, req.body);
        res.status(200).json({
            success: true,
            message: "Testimonial update successfully!",
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
export default updateTestimonialController