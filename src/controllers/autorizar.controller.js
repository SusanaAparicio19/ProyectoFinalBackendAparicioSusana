//para web

/*export function soloLogueadosApi(req, res, next) {
  if (!req.session.user) {
    return res.failedGet();
  }
  next();
}
  
export function soloLogueadosWeb(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
      }
    next();
  }

export const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.usuario.role === 'admin') {
      console.log(req.usuario.role)
      return next();
    }
    res.status(403).send('Acceso no autorizado');
  };
  
export const isUser = (req, res, next) => {
    if (req.isAuthenticated() && req.usuario.role === 'usuario') {
      return next();
    }
    res.status(403).send('Acceso no autorizado');
  };
  
export const isPremium = (req, res, next) => {
    if (req.isAuthenticated() && req.usuario.role === 'premium') {
      return next();
    }
    res.status(403).send('Acceso no autorizado');
  };
  */
