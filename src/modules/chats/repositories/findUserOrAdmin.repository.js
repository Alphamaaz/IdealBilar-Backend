//External modules

//Internal modules
import User from '../../user/models/user.model.js';
const findUserOrAdminRepository = async (id) => {
    try {
        const result = await User.findOne({_id: id});
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    findUserOrAdminRepository
}