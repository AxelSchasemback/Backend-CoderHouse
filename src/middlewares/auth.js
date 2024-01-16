export function loguedApi(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(400).json({ status: 'error', message: 'usuario no logueado' })
    }
    next()
}

export function loguedWeb(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/login')
    }
    next()
}

export function onlyAdmins(req, res, next) {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ status: 'error', message: 'solo para admins' })
    }
    next()
  }
  
  export function isAdmin(username, password) {
    return username === 'adminCoder@coder.com' && password === 'adminCod3r123'
  }