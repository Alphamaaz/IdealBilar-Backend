//External models

//Internal models
import { accountSettingService } from "../services/accountSetting.service.js";
import passwordHash from "../../../shared/utils/passwordHashGenerate.js";
const accountSettingController = async (req, res) => {
    try{
        if(req.body.password){
            if(!(req.body.password === req.body.confirmPassword)){
                return res.status(409)
                .json({
                    success: true,
                    message: "Your password and confirm password not match!"
                })
            }
        }
            delete req.body['confirmPassword'];
            console.log("We check the body after delete the confirm password ", req.body);
            
            const hashedPassword = await passwordHash(req.body.password);
            
            const body = {
               ...req.body,
               password: hashedPassword
            }
            const request = {
                userId: req.userId,
                body: body
            }
            const result = await accountSettingService(request);
            res.status(200)
            .json({
                success: true,
                message: "Your Profile is updated Successfully!",
                data: result
            })
    }catch(error){
        res.status(404)
        .json({
            success: false,
            message: error.message
        })
    }
}

//export
export {
    accountSettingController
}