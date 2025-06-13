/**
 * Middleware de autenticación
 */

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
};

const requireNoAuth = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/declarations');
  }
  next();
};

module.exports = {
  requireAuth,
  requireNoAuth
};
