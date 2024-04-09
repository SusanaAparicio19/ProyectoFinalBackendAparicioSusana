import { userModel } from '../models/User.model.js';
import { hashear } from '../utils/cripto.js';


class UserDao {
    async create(userDto) {
        try {
            const doc = await userModel.create(userDto)
            return doc.toPOJO()
        } catch (error) {
            throw error;
        }
    }

    async findOne (_id) {
      try {
            const doc = await userModel.findOne(_id)
            if (!doc) return null
            return doc.toPOJO()
      } catch (error) {
        throw error;
      }
    }

    async findAllUsers(query) {
        try {
            const usersFound = await userModel.find({ query }).lean();
            return usersFound;
        } catch (error) {
            throw new Error('Error al buscar usuarios en la base de datos');
        }
    }
    
    async findInactiveUsers(timeLimit) {
        try {
          return await userModel.find({ lastConnection: { $lt: timeLimit } }).lean();
        } catch (error) {
          throw new Error('Error finding inactive users');
        }
    }
    
    async resetPassword (username, newPassword) {
        try {
            newPassword = hashear(newPassword);
    
            const updatedUser = await userModel.findOneAndUpdate(
                { username: username },
                { $set: { password: newPassword } },
                { new: true }
            )
            .lean();
            if (!updatedUser) {
               throw new Error("No se pudo actualizar!");
            }
            
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    async updateOne (query, newDocDto) {
        try {
                const doc = await userModel.findOneAndUpdate(query, { $set: newDocDto })
                if (!doc) return null
                return doc.toPOJO()
        } catch (error) {
            throw error;
            //errorHandlers.error(error); 
        }
    }
    
    async deleteOne (userId) {
        try {
            return await userModel.findOneAndDelete({ _id: userId });
        } catch (error) {
            throw error;
        }
    }       
}  

export const userDao = new UserDao()

