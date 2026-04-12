// External modules

// Internal modules
import contactusDataForDashboard from "../repositories/contactusDataForDashboard.repository.js";
const contactusData = async () => {
    try{
      const result = await contactusDataForDashboard();
      return result;
    }catch(err){
        throw err;
    }
}

// exports

export default contactusData;