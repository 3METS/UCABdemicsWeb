const express = require('express');
const MailService = require('../services/mail');

function MailApi(app) {
  const router = express.Router();
  app.use('/api/mail', router);

  const mailService = new MailService();

  router.get('/', async (req, res) => {
    res.status(200).end(`<h1>Bienvenido a UCABdemics</h1>`);
  });

  router.post('/recovery', async (req, res, next) => {
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
  });

  router.post('/welcome', async (req, res, next) => {
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
  });
}

module.exports = MailApi;
