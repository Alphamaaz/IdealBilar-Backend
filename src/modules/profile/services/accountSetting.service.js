//External modules

//Internal modules
import { accountSettingRepository } from "../repositories/accountSetting.repository.js";
const accountSettingService = async (request) => {
  try {
    const data = request.body;
    const userId = request.userId;
    const result = await accountSettingRepository(userId, data);
    return result;
  } catch (error) {
    throw error;
  }
};

//export
export { accountSettingService };
