const express = require('express');
const ProfesorService = require('../services/Profesor');

const {
  profesorIdSchema,
  createProfesorSchema,
  updateProfesorSchema,
} = require('../utils/models/Profesor');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function profesorApi(app) {
  const router = express.Router();

  app.use('/api/profesores', router);

  const profesorService = new ProfesorService();

  router.get('/', async (req, res, next) => {
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
  });

  router.get(
    '/:id',
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
