import { User } from '../dto/user.dto.js'
import { hashear } from '../utils/cripto.js'
import { userRepository } from '../repository/user.repository.js'
//import { emailService } from './email/email.service.js'

class UserService {
    constructor({ userRepository, /*emailService*/ }) {
        this.userRepository = userRepository
        /*this.emailService = emailService*/
    }

    async register(userData) {
        try {
            const user = new User({
            ...userData,
            password: hashear(userData.password)
            })
            await this.userRepository.save(user)
            //await this.emailService.send(user.email, 'bienvenida', 'gracias por registrarte!')
            const pojo = user.toPOJO()
            return pojo
        } catch (error) {
            throw error;
        }
    }

    async findOne(_id) {
        try {
            return await this.userRepository.findOne(_id);
        } catch (error) {
            throw error;
        }
    }
    
    async findAllUsersBasicInfo() {
        try {
            const users = await userRepository.findAllUsersBasicInfo();
            return users;
        } catch (error) {
            throw error;
        }
    }
    
    async resetPassword (username, newPassword) {
        return await userRepository.resetPassword(username, newPassword);
        
    }
    
    async deleteOne(userId) {
        try {
            const deleteUser = await userRepository.deleteOne(userId);
            if (!deleteUser) {
                throw new Error('No se encontró ningún usuario con el ID proporcionado');
            }
            return await userRepository.deleteOne(userId);
        } catch (error) {
           throw new Error('Error al eliminar usuario por ID en la base de datos: ' + error.message);
        }
    }    

    
}
export const userService = new UserService({ userRepository }) /*emailService*/ 
