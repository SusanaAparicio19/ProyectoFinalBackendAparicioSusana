import { Router } from 'express'
import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/autenticar.js'
import passport from 'passport'

export const sessionsRouter = Router()

// login
sessionsRouter.post('/',
  passport.authenticate('localLogin', {
    failWithError: true,
    session: false
  }),
  appendJwtAsCookie,
  async (req, res, next) => {
    res['successful (200)'](req.user)
  }
)

// view
sessionsRouter.get('/current',
  passport.authenticate('jwtAuth', {
    session: false
  }),
  async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json(req.user);
  }
);

// logout
sessionsRouter.delete('/current',
  removeJwtFromCookies,
  async (req, res, next) => {
    res['successDelete (204)']()
  }
)

