const express = require('express');
const passport = require('passport');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UserService = require('../services/Usuario');

const { config } = require('../config/index');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');
const { createUsuarioSchema } = require('../utils/models/usuario');

require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();

  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const userService = new UserService();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken es requerido'));
    }

    passport.authenticate('basic', function (err, user) {
      try {
        if (err || !user) {
          next(boom.unauthorized());
          return;
        }

        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }
          const { _id: id, profesor, email } = user;

          const payload = {
            sub: id,
            profesor,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });

          return res.status(200).json({ token, user: { id, email, profesor } });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.post(
    '/sign-up',
    validationHandler(createUsuarioSchema),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const createdUserId = userService.createUsuario({ usuario: user });
        res.status(200).json(createdUserId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = authApi;
