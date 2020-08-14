const express = require('express');
const PeriodoAcademicoService = require('../services/PeriodoAcademico');

const {
  periodoAcademicoIdSchema,
  createPeriodoAcademico,
  updatePeriodoAcademico,
} = require('../utils/models/periodoAcademico');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function periodoApi(app) {
  const router = express.Router();

  app.use('/api/periodosAcademicos', router);

  const periodoService = new PeriodoAcademicoService();

  router.get('/', async (req, res, next) => {
    const { termino, fechaInicio } = req.query;
    try {
      const periodos = await periodoService.getPeriodos({
        termino,
        fechaInicio,
      });
      res.status(200).json(periodos);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:id',
    validationHandler(periodoAcademicoIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const periodo = await periodoService.getPeriodo({
          id,
        });
        res.status(200).json(periodo);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createPeriodoAcademico),
    async (req, res, next) => {
      const { body: periodo } = req;
      try {
        const insertedPeridoId = await periodoService.createPeriodo({
          periodo,
        });
        res.status(201).json(insertedPeridoId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    ':id',
    validationHandler(periodoAcademicoIdSchema, 'params'),
    validationHandler(updatePeriodoAcademico),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: periodo } = req;
      try {
        const updetedPeriodoId = await periodoService.updatePeriodo({
          id,
          periodo,
        });
        res.status(200).json(updetedPeriodoId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    validationHandler(periodoAcademicoIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedPeriodoId = await periodoService.deletePeriodo({ id });
        res.status(200).json(deletedPeriodoId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = periodoApi;
