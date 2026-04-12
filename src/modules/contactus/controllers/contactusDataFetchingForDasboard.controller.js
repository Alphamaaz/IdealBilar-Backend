// External modules

// Internal modules
import contactusData from "../services/contactusDataFetchingForDashboard.service.js";
const contactusDataFetchingController = async (req,res) => {
    try{
      const result = await contactusData();
      if(!result){
        return res.status(400).json({
            success: false,
            message: "No one is contact us yet!"
        })
      }else{
        res.status(200).json({
            success: true,
            message: "Contact us data fetched successfully!",
            result
        })
      }
    }catch(err){
        throw err;
    }
}

// export 

export {
    contactusDataFetchingController
}