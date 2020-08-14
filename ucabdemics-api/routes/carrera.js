const express = require('express');
const CarreraService = require('../services/Carrera');

const {
  carreraIdSchema,
  createCarreraSchema,
  updateCarreraSchema,
} = require('../utils/models/carrera');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function carreraApi(app) {
  const router = express.Router();

  app.use('/api/carreras', router);

  const carreraService = new CarreraService();

  router.get('/', async (req, res, next) => {
    const { nombre, competencia, asignatura } = req.query;
    try {
      const carreras = await carreraService.getCarreras({
        nombre,
        competencia,
        asignatura,
      });
      res.status(200).json(carreras);
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
        const carrera = await carreraService.getCarrera({
          id,
        });
        res.status(200).json(carrera);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createCarreraSchema),
    async (req, res, next) => {
      const { body: carrera } = req;
      try {
        const insertedCarreraId = await carreraService.createCarrera({
          carrera,
        });
        res.status(201).json(insertedCarreraId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    ':id',
    validationHandler(carreraIdSchema, 'params'),
    validationHandler(updateCarreraSchema),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: carrera } = req;
      try {
        const updetedCarreraId = await carreraService.updateCarrera({
          id,
          carrera,
        });
        res.status(200).json(updetedCarreraId);
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
        res.status(200).json(deletedCarreraId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = carreraApi;
