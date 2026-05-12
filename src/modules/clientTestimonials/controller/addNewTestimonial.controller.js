//External modules

//Internal modules
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import settingResponse from "../../../shared/utils/settingResponse.js";
import { adminAddNewTestimonialValidation } from "../validators/addNewTestimonial.validator.js";
import { normalizeDate } from "../../../shared/utils/normalizeToDateOnlyUTC.js";
import { adminAddNewTestimonialService } from "../services/addNewTestimonial.service.js";
//This controller is use when the admin add new testimonial
const adminAddNewTestimonial = async (req, res) => {
    try {
        const convertDateToUTCStandard = normalizeDate(req.body.date);
        const setObject = {
            ...req.body,
            date:convertDateToUTCStandard.date,
        }
       const {success, data, error} = adminAddNewTestimonialValidation(setObject);
       if(!success){
        const validationError = settingErrorStatusAndMessage(error);
        return settingResponse(res, validationError);
       }
       const result = await adminAddNewTestimonialService(data);
        res.status(200).json({
            success: true,
            message: "Reached to the admin add new testimonial endpoint!",
            result: result
       
        })
    } catch (error) {
        console.log("we are in the catch block ", error.message);
        
        // res.status(400).json({
        //     success: false,
        //     message: error.message
        // })
    }
}

//export
export default adminAddNewTestimonial;