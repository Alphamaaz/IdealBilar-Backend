import User from "../../user/models/user.model.js"
const getAdmin = async () =>{
    try {
        const result = await User.find({role: 'admin'}).select('-password');
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    getAdmin
}