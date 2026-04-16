// External modules

// Internal modules
import { buyACarDataDeleteService } from "../services/buyACarDataDelete.service.js"
const buyACarDataDeleteFromAdminDasboard = async (req, res) => {
    try{
        const buyACarId = req.params.carId;
      const result = await buyACarDataDeleteService(buyACarId);
      
      res.status(200).json({
        success: true,
        message: "The Buy a Car data deleted successfully!",
        data: result

      })
    }catch(error){
        throw error
    }
}

//export
export {
    buyACarDataDeleteFromAdminDasboard
}