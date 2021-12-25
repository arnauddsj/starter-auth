const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json('Unauthorized resource')
  }

  // Remove this if no need validation process
  if (req.user?.activation === 'PENDING') {
    return res.status(401).json('Your account is not validated')
  }

  // Remove this if no need validation process
  if (req.user?.activation === 'REVOKED') {
    return res
      .status(401)
      .json('Your account is deactivated, please contact support.')
  }

  next()
}

const isAdmin = (req, res, next) => {
  // Can change ADMIN to a boolean value if simplification needed
  if (!req.isAuthenticated() || req.user.userType !== 'ADMIN') {
    return res.status(401).json('Unauthorized resource')
  }

  next()
}

module.exports = {
  isAuth,
  isAdmin,
}
