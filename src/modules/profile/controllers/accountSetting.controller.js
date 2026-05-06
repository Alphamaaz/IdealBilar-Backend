//External models

//Internal models
import { accountSettingService } from "../services/accountSetting.service.js";
import passwordHash from "../../../shared/utils/passwordHashGenerate.js";
import { accountSettingValidation } from "../validations/accountSetting.validation.js";
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import settingResponse from "../../../shared/utils/settingResponse.js";
const accountSettingController = async (req, res) => {
  try {
    const { success, data, error } = accountSettingValidation(req.body);
    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return settingResponse(res, validationError);
    }

    delete req.body["confirmPassword"];

    let body = null;

    if (req.body.password) {
      const hashedPassword = await passwordHash(req.body.password);
      body = {
        ...req.body,
        password: hashedPassword,
      };
    } else {
      body = { ...req.body };
    }

    const request = {
      userId: req.userId,
      body: body,
    };
    const result = await accountSettingService(request);
    res.status(200).json({
      success: true,
      message: "Your Profile is updated Successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//export
export { accountSettingController };
