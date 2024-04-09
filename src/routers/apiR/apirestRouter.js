import { Router } from 'express'
import { usersRouter } from './usersRouter.js'
import { successMethod } from '../../middlewares/successMethod.js'
import { sessionsRouter } from './sessionsRouter.js'
import { docsRouter } from '../documentacion.router.js'

export const apiRouter = Router()

apiRouter.use(successMethod)
apiRouter.use('/docs', docsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)

