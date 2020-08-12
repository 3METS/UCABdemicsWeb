const express = require('express');
const CarreraService = require('../services/Carrera');

const {
  carreraIdSchema,
  createCarrera,
  updateCarrera,
} = require('../utils/models/Carrera');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function carreraApi(app) {
  const router = express.Router();

  app.use('/api/carreras', router);

  const carreraService = new CarreraService();

  router.get('/', async (req, res, next) => {
    const { nombre, competencia, asignatura } = req.params;
    try {
      const carreras = await carreraService.getCarreras({
        nombre,
        competencia,
        asignatura,
      });
      res.status(200).json({
        data: carreras,
        message: 'carreras listadas',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:id',
    validationHandler(carreraIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const carrera = await carreraService.getCarrera({ id });
        res.status(200).json({
          data: carrera,
          message: 'carrera extraida',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', validationHandler(createCarrera), async (req, res, next) => {
    const { body: carrera } = req;
    try {
      const createdCarreraId = await carreraService.createCarrera({ carrera });
      res.status(201).json({
        data: createdCarreraId,
        message: 'carrera creada',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:id',
    validationHandler(carreraIdSchema, 'params'),
    validationHandler(updateCarrera),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: carrera } = req;
      try {
        const updatedCarreraId = await carreraService.updateCarrera({
          data: carrera,
          id,
        });
        res.status(200).json({
          data: updatedCarreraId,
          message: 'carrera actualizada',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    validationHandler(carreraIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedCarreraId = await carreraService.deleteCarrera({ id });
        res.status(200).json({
          data: deletedCarreraId,
          message: 'carrera eliminada',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = carreraApi;
