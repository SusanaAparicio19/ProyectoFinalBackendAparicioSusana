const listOfRolesForAdminContent = ['admin']

const listOfRolesForUserContent = ['user', 'admin']

const listOfRolesForPremiumContent = ['premium']

export async function usersOnly(req, res, next) {
  if (!listOfRolesForUserContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}

export async function adminsOnly(req, res, next) {
  if (!listOfRolesForAdminContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}

export async function premiumOnly(req, res, next) {
  if (!listOfRolesForPremiumContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}

