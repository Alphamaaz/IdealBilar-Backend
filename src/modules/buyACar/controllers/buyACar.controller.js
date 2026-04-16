//External modules

import { buyACarDataValidation } from "../validations/buyACar.validation.js";

//Internal modules
// import { buyACarService } from "../services/buyACar.service.js";
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import settingResponse from "../../../shared/utils/settingResponse.js";
import { buyACarService } from "../services/buyACar.service.js";
const buyACarController = async (req, res) => {
  try {
    console.log("User id come from middleware ", req.userId);
    const buyACarData = {
      ...req.body,
      userId: req.userId,
    };

    const { success, data, error } = buyACarDataValidation(buyACarData);
    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return settingResponse(res, validationError);
    }
    const result = await buyACarService(data);

    res.status(200).json({
      success: true,
      message: "You are Buy a car request recived successfully!",
      data: result,
    });
  } catch (err) {
    // throw err;
  }
};

//export

export { buyACarController };
