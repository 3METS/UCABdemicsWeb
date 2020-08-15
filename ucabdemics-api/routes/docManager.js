require('../utils/auth/strategies/jwt');
const express = require('express');
const passport = require('passport');
const DocManagerService = require('../services/DocManager');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');

function docManagerApi(app) {
  const router = express.Router();

  app.use('/api/docManager', router);

  const docManagerService = new DocManagerService();

  router.get(
    '/plan/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:docManager']),
    (req, res, next) => {
      const { period, seccion, asignatura } = req.query;

      const filePath = docManagerService.getFile({
        period,
        seccion,
        asignatura,
      });
      if (filePath) {
        res.status(200).download(filePath, `file.docx`);
      } else {
        next(new Error('File not found.'));
      }
    }
  );

  router.post(
    '/plan',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:docManager']),
    async (req, res, next) => {
      const { period, seccion, asignatura } = req.body;
      try {
        const job = await docManagerService.writeClassPlan({
          data: { period, seccion, asignatura },
        });
        res.status(200).json({ job, message: 'generating document' });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = docManagerApi;
