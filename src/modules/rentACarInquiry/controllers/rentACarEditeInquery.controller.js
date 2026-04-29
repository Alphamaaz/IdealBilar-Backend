//External modules

import { updateRentACarService } from "../services/updateRentACarDataInquiry.service.js";

//Internal modules

const rentACarEditeController = async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body;
        const result = await updateRentACarService(id, data);
        res.status(200).json({
            success: true,
            message: "Rent a car inquiry updated successfully",
            data: result
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to update rent a car inquiry",
            error: err.message
        });
    }
}

//exports
export {
    rentACarEditeController
}