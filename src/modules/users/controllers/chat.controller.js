import { chatDataService } from "../services/chat.service.js";
const chatController = async (req, res) => {
    try{
      const result = await chatDataService();
      res.status(200).json({
        success: true,
        message: "Fetchec chat data successfully!",
        data: result
      })
    }catch(error){
        throw error
    }
}

export {
    chatController
}