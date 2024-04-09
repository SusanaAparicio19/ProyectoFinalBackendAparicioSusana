import { Router } from 'express'
import { passportAuth } from '../../middlewares/passport.js'
import { adminsOnly } from '../../middlewares/autorizar.js'
import { registerUser, findUserById, findAllUsers, getCurrentUser, resetUserPassword, deleteOne, deleteInactiveUsers } from '../../controllers/apiR.controllers/usersRouter.controller.js'

export const usersRouter = Router()

usersRouter.post('/', registerUser);

usersRouter.get('/current', getCurrentUser);
usersRouter.get('/:userId', findUserById);
usersRouter.get('/', passportAuth, adminsOnly, findAllUsers);
usersRouter.put("/reset", resetUserPassword);
usersRouter.delete('/:userId', deleteOne);
usersRouter.delete('/:user/inactive', passportAuth, adminsOnly, deleteInactiveUsers);
