//External modules

//Internal modules
import User from '../../user/models/user.model.js'
const accountSettingRepository = async (userId, userData) => {
    try {
        const result = await User.findByIdAndUpdate(
            userId,
            userData,
            {returnDocument: 'after'}
        );
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    accountSettingRepository
}