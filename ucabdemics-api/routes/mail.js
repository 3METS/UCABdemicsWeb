require('../utils/auth/strategies/jwt');
const express = require('express');
const passport = require('passport');
const MailService = require('../services/mail');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');

function MailApi(app) {
  const router = express.Router();
  app.use('/api/mail', router);

  const mailService = new MailService();

  router.post(
    '/recovery',
    scopesValidationHandler(['create:mailRecovery']),
    async (req, res, next) => {
      const { name, email } = req.body;
      try {
        const recoveryValue = mailService.sendRecovery({ name, email, res });
        res.status(201).json({
          recoveryValue,
          message: 'job in queue',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/welcome',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:mailWelcome']),
    async (req, res, next) => {
      const { email } = req.body;
      try {
        const job = await mailService.sendWelcome({ email, res });
        res.status(201).json({
          job,
          message: 'job in queue',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = MailApi;
