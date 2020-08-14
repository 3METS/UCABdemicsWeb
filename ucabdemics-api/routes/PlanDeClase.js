const express = require('express');
const PlanDeClaseService = require('../services/PlanDeClase');

const {
  planClaseIdSchema,
  createPlanClaseSchema,
  updatePlanClaseSchema,
} = require('../utils/models/planDeClase');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function planDeClaseApi(app) {
  const router = express.Router();

  app.use('/api/planesClases', router);

  const planDeClaseService = new PlanDeClaseService();

  router.get('/', async (req, res, next) => {
    const {
      escuela,
      contenidoProgramatico,
      seccion,
      periodo,
      asignatura,
      profesor,
    } = req.query;
    try {
      const planesClases = await planDeClaseService.getPlanesDeClases({
        escuela,
        contenidoProgramatico,
        seccion,
        periodo,
        asignatura,
        profesor,
      });
      res.status(200).json(planesClases);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:id',
    validationHandler(planClaseIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const planClase = await planDeClaseService.getPlanDeClase({
          id,
        });
        res.status(200).json(planClase);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createPlanClaseSchema),
    async (req, res, next) => {
      const { body: planDeClase } = req;
      try {
        const insertedPlanDeClaseId = await planDeClaseService.createPlanDeClase(
          {
            planDeClase,
          }
        );
        res.status(201).json(insertedPlanDeClaseId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    ':id',
    validationHandler(planClaseIdSchema, 'params'),
    validationHandler(updatePlanClaseSchema),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: planDeClase } = req;
      try {
        const updetedPlanDeClaseId = await planDeClaseService.updatePlanDeClase(
          {
            id,
            planDeClase,
          }
        );
        res.status(200).json(updetedPlanDeClaseId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    validationHandler(planClaseIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedPlanDeClaseId = await planDeClaseService.deletePlanDeClase(
          { id }
        );
        res.status(200).json(deletedPlanDeClaseId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = planDeClaseApi;
