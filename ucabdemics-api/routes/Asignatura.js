require('../utils/auth/strategies/jwt');
const express = require('express');
const passport = require('passport');
const AsignaturaService = require('../services/Asignatura');
const { asignaturaIdSchema } = require('../utils/models/asignatura');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');

function asignaturaApi(app) {
  const router = express.Router();
  app.use('/api/asignaturas', router);

  const asignaturaService = new AsignaturaService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:asignaturas']),
    async (req, res, next) => {
      const { carrera, codigo, semestre, departamento } = req.query;
      try {
        const asignaturas = await asignaturaService.getAsignaturas({
          carrera,
          codigo,
          semestre,
          departamento,
        });
        res.status(200).json(asignaturas);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:asignaturas']),
    validationHandler(asignaturaIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const asignatura = await asignaturaService.getAsignatura({
          id,
        });
        res.status(200).json(asignatura);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = asignaturaApi;
