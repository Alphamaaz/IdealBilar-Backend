//External modules

//Internal modules
import { getAllTestimonialService } from "../services/getAllTestimonial.service.js"
const getAllTestimonialController = async (req, res) => {
    try {
        const result = await getAllTestimonialService();
        res.status(200).json({
            success: true,
            message: "Fetched all the recent testimonials!",
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
export default getAllTestimonialController