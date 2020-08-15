require('../utils/auth/strategies/jwt');
const express = require('express');
const passport = require('passport');
const SeccionService = require('../services/Seccion');

const {
  seccionIdSchema,
  createSeccionSchema,
  updateSeccionSchema,
} = require('../utils/models/seccion');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');

function seccionApi(app) {
  const router = express.Router();

  app.use('/api/secciones', router);

  const seccionService = new SeccionService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:secciones']),
    async (req, res, next) => {
      const { nrc, asignatura, planClase, profesor, periodo } = req.query;
      try {
        const secciones = await seccionService.getSecciones({
          nrc,
          asignatura,
          planClase,
          profesor,
          periodo,
        });
        res.status(200).json(secciones);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:secciones']),
    validationHandler(seccionIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const seccion = await seccionService.getSeccion({
          id,
        });
        res.status(200).json(seccion);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:secciones']),
    validationHandler(createSeccionSchema),
    async (req, res, next) => {
      const { body: seccion } = req;
      try {
        const insertedSeccionId = await seccionService.createSeccion({
          seccion,
        });
        res.status(201).json(insertedSeccionId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    ':id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:secciones']),
    validationHandler(seccionIdSchema, 'params'),
    validationHandler(updateSeccionSchema),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: seccion } = req;
      try {
        const updetedSeccionId = await seccionService.updateSeccion({
          id,
          seccion,
        });
        res.status(200).json(updetedSeccionId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:secciones']),
    validationHandler(seccionIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedSeccionId = await seccionService.deleteSeccion({ id });
        res.status(200).json(deletedSeccionId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = seccionApi;
