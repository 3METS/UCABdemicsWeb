const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('boom');
const bcrypt = require('bcrypt');

const UsuarioService = require('../../../services/Usuario');
const usuarioService = new UsuarioService();
passport.use(
  new BasicStrategy(async (email, password, cb) => {
    try {
      const usuario = await usuarioService.getUsuarios({ email });
      if (!usuario.length) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, usuario[0].password))) {
        return cb(boom.unauthorized(), false);
      }

      delete usuario[0].password;

      return cb(null, usuario[0]);
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user._id); // Underscore before ID.
});

passport.deserializeUser(function (id, done) {
  usuarioService.getUsuario({ id }).then((user) => {
    console.log(user);
    done(err, user);
  });
});
