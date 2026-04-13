//External modules

//Internal modules
import { buyACarService } from "../services/buyACar.service.js";

const buyACarController = async (req, res) => {
    try{
       buyACarService("hjkjskdj");
       res.status(200).json({
        success: true,
        message: "Reached to teh buy a car controller successfully!"
       })

    }catch(err){
        throw err;
    }
}

//export

export {
    buyACarController
}