//external modules
import { z } from "zod";
//Internal modules
const accountSettingSchema = z
.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string()
    .regex(/^\+92[1-9]\d{1,14}$/, "Phone number must start with + and have 2-15 digits total")
    .optional(),
    password: z.string().min(6).optional(),
    confirmPassword: z.string().min(6).optional(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
  });

const accountSettingValidation = (accountData) => {
    try {
        return accountSettingSchema.safeParse(accountData); 
    } catch (err) {
        throw err;
    }
}

//exports
export {
    accountSettingValidation
}