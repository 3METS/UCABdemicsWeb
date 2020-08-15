const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');

const UsuarioService = require('../../../services/Usuario');
const { config } = require('../../../config/index');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const usuarioService = new UsuarioService();
      try {
        const user = await usuarioService.getUsuarios({
          correo: tokenPayload.email,
        });
        if (!user.length) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (err) {
        return cb(err);
      }
    }
  )
);
