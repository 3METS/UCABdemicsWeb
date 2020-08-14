const express = require('express');
const SeccionService = require('../services/Seccion');

const {
  seccionIdSchema,
  createSeccionSchema,
  updateSeccionSchema,
} = require('../utils/models/Seccion');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function seccionApi(app) {
  const router = express.Router();

  app.use('/api/secciones', router);

  const seccionService = new SeccionService();

  router.get('/', async (req, res, next) => {
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
  });

  router.get(
    '/:id',
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
