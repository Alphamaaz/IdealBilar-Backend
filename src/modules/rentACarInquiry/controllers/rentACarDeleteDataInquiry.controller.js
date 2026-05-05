// External modules

import { rentACarDataDeleteService } from "../services/rentACarDataDeleteInquiry.service.js";

//Internal modules

const rentACarDeleteDataController = async (req, res) => {
    try{
        const result = await rentACarDataDeleteService(req.params.id);
        res.status(result.status).json({
            success: result.success,
            message: result.message,
            data: result.data
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};


//exports

export {
    rentACarDeleteDataController
}
