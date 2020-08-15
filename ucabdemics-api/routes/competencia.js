require('../utils/auth/strategies/jwt');
const express = require('express');
const passport = require('passport');
const CompetenciaService = require('../services/Competencia');

const { competenciaIdSchema } = require('../utils/models/competencia');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');

function competenciaApi(app) {
  const router = express.Router();

  app.use('/api/competencias', router);

  const competenciaService = new CompetenciaService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:competencias']),
    async (req, res, next) => {
      const { competencia } = req.query;
      try {
        const competencias = await competenciaService.getCompetencias({
          competencia,
        });
        res.status(200).json(competencias);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:competencias']),
    validationHandler(competenciaIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const competencia = await competenciaService.getCompetencia({
          id,
        });
        res.status(200).json(competencia);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = competenciaApi;
