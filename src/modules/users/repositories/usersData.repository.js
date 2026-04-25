import User from '../../user/models/user.model.js'

const usersDataRepository = async () => {
    try {
        const result = await User.find({role: 'user'}).select('-password');
        return result;
    } catch (error) {
        throw error;
    }
}

export {
    usersDataRepository
}