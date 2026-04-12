//Internal modules
import settingResponse from '../../../shared/utils/settingResponse.js';
import {contactusService} from '../services/contactus.service.js';

const contactusController = async (req,res) => {
    try{
        const result = await contactusService(req.body);
        
        if (result instanceof Error) {
          return settingResponse(res, result);
        }

       res.status(200).json({
        success: true,
        message: "Contact request submitted successfully",
        data: result
       })
    }catch(err){
        throw err;
    }
}

// exports

export  {contactusController};