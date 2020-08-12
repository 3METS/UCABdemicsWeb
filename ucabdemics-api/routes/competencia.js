const express = require('express');
const CompetenciaService = require('../services/Competencia');

const { competenciaIdSchema } = require('../utils/models/competencia');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function competenciaApi(app) {
  const router = express.Router();

  app.use('/api/competencias', router);

  const competenciaService = new CompetenciaService();

  router.get('/', async (req, res, next) => {
    const { competencia } = req.query;
    try {
      const competencias = await competenciaService.getCompetencias({
        competencia,
      });
      res.status(200).json({
        data: competencias,
        message: 'competencias listadas',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:id',
    validationHandler(competenciaIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const competencia = await competenciaService.getCompetencia({
          competenciaId: id,
        });
        res.status(200).json({
          data: competencia,
          message: 'competencia extraida',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = competenciaApi;
