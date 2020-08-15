require('../utils/auth/strategies/jwt');
const express = require('express');
const passport = require('passport');
const ProfesorService = require('../services/Profesor');

const {
  profesorIdSchema,
  createProfesorSchema,
  updateProfesorSchema,
} = require('../utils/models/profesor');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');

function profesorApi(app) {
  const router = express.Router();

  app.use('/api/profesores', router);

  const profesorService = new ProfesorService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:profesores']),
    async (req, res, next) => {
      const { cedula, nombre, profesor } = req.query;
      try {
        const profesores = await profesorService.getProfesores({
          cedula,
          nombre,
          profesor,
        });
        res.status(200).json(profesores);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:profesores']),
    validationHandler(profesorIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const profesor = await profesorService.getProfesor({
          id,
        });
        res.status(200).json(profesor);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:profesores']),
    validationHandler(createProfesorSchema),
    async (req, res, next) => {
      const { body: profesor } = req;
      try {
        const insertedProfesorId = await profesorService.createProfesor({
          profesor,
        });
        res.status(201).json(insertedProfesorId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    ':id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:profesores']),
    validationHandler(profesorIdSchema, 'params'),
    validationHandler(updateProfesorSchema),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: profesor } = req;
      try {
        const updetedProfesorId = await profesorService.updateProfesor({
          id,
          profesor,
        });
        res.status(200).json(updetedProfesorId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:profesores']),
    validationHandler(profesorIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedProfesorId = await profesorService.deleteProfesor({ id });
        res.status(200).json(deletedProfesorId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = profesorApi;
