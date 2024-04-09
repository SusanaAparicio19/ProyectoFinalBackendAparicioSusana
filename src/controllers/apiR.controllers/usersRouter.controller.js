import passport from 'passport';
import { appendJwtAsCookie } from '../../middlewares/autenticar.js';
import { userService } from '../../service/user.service.js';
import { emailService } from '../../service/email.service.js'
import { userDao } from '../../dao/user.dao.js';
import errorHandlers from '../../middlewares/errorHandler.js';


export async function registerUser(req, res, next) {
    passport.authenticate('localRegister', {
        failWithError: true,
        session: false
    })(req, res, async (error) => {
        if (error) {
            next(error);
            return;
        }
        appendJwtAsCookie(req, res, async () => {
            res['successCreated (201)'](req.user);
            
        });
    });
}

export async function getCurrentUser(req, res, next) {
    passport.authenticate('jwtAuth', {
        failWithError: true,
        session: false
    })(req, res, async (error) => {
        if (error) {
            next(error);
            return;
        }
        
        res['successful (200)'](req.user);
    });
}

export async function findUserById(req, res, next) {
    req.loggerUtils.http('Estoy en el get de usuarios')
    try {
        const user = await userService.findOne({ _id: req.params.userId });
        if (!user) {
             errorHandlers.error(res, 404, 'NotFound');
            }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export async function findAllUsers(req, res, next) {
    req.logger.http('Estoy en el get de usuarios');
    try {
        const users = await userService.findAllUsersBasicInfo();
        res.status(200).json(users);
    } catch (error) {
        req.logger.error('Fallo al obtener usuarios. Error: ' + error.message);
        next(error);
    }
}

export async function resetUserPassword(req, res, next) {
    try {
        const { username, newPassword } = req.body;   
        const updatedPassword = await userService.resetPassword(username, newPassword);
        if (!updatedPassword) {
            errorHandlers.error(res, 404, 'NotFound');
            return; 
            }
            res['successful (200)'](updatedPassword);
        } catch (error) {
            next(error); 
        }
}

export async function deleteOne(req, res, next) {
    try {
        const userId = req.params.userId;
        await userService.deleteOne(userId);
        res['successDelete (204)']();
        
    } catch (error) {
        next(error);
    }
}   
    
export const deleteInactiveUsers = async (req, res, next) => {
    try {
      const timeLimit = new Date(Date.now() - 30 * 60 * 1000); // Últimos 30 minutos para prueba
      //const tiempoLimite = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // Últimos 2 días

      const inactiveUser = await userDao.findInactiveUsers(timeLimit);
       
      // Opción para borrar usuarios inactivos (descomentar para activar)
      // inactiveUsers.forEach(async (user) => {
      //   await userModel.findByIdAndDelete(user._id);
      // });

      inactiveUser.forEach(async (user) => {
        await emailService.sendEmail(
          user.email,
          '46Soles, le informa que su cuenta ha sido eliminada por inactividad!',
        );
      });
      
      console.log('Usuarios inactivos encontrados:', inactiveUser);
      res.json({ mensaje: 'Usuarios inactivos encontrados.', inactiveUser });
    } catch (error) {
      next(error);
    }
}



