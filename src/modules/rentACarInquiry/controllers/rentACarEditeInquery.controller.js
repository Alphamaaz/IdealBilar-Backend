//External modules


//Internal modules
import { updateRentACarService } from "../services/updateRentACarDataInquiry.service.js";

const rentACarEditeController = async (req, res) =>{
    try{
        const result = await updateRentACarService(req.params.id, req.body);
        res.status(result.status).json({
            success: result.success,
            message: result.message,
            data: result.data
        });
    }catch(err){
        throw err;
    }
}

//exports
export {
    rentACarEditeController
}