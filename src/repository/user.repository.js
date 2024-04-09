import { userDao } from '../dao/user.dao.js'
import { userModel } from '../models/User.model.js';
import { User } from '../dto/user.dto.js'

export class UserRepository {
    constructor({ userDao }) {
        this.userDao = userDao
    }

    async save(user) {
        try {
            const found = await this.userDao.findOne({ _id: user._id })
            if (found) {
            await this.userDao.updateOne({ _id: user._id }, user.toPOJO())
            } else {
            await this.userDao.create(user.toPOJO())
            }
        } catch (error) {
            throw error;
        }
    }

    async findOne(_id) {
        const dto = await this.userDao.findOne(_id)
        if (!dto) throw new Error('not found')
        return new User(dto)
    }

    async findAllUsersBasicInfo() {
        try {
            const users = await userModel.find({}, 'username email rol').lean();
            return users;
        } catch (error) {
            throw new Error('Error al buscar usuarios en la base de datos');
        }
    }
    
    async resetPassword (username, newPassword) {
        return await this.userDao.resetPassword(username, newPassword);
    }

    async deleteOne(userId) {
        return await this.userDao.deleteOne(userId);
    }
}
    
export const userRepository = new UserRepository({ userDao })
