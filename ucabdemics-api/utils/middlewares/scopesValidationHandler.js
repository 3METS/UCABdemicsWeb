const boom = require('boom');

function scopeValidationHandler(allowedScopes) {
  return function (req, res, next) {
    if (!req.user || !req.user.scopes) {
      next(boom.unauthorized('Scopes perdidos'));
    }

    const hasAccess = allowedScopes
      .map((allowedScope) => req.user.scopes.includes(allowedScope))
      .find((allowed) => Boolean(allowed));

    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Permisos insuficientes'));
    }
  };
}

module.exports = scopeValidationHandler;
