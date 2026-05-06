//External modules
import express from 'express';
//Internal modules
import { middlewareForVerifyJwtToken } from '../../../shared/middlewares/auth.middleware.js';
import { accountSettingController } from '../controllers/accountSetting.controller.js';
const profileRouter = express.Router();

// Account setting api

profileRouter.put('/user/profile', middlewareForVerifyJwtToken, accountSettingController)


//export
export default profileRouter