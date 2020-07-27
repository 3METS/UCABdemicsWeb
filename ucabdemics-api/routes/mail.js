const express = require('express');
const AgendaService = require('../services/agenda');

function MailApi(app) {
  const router = express.Router();
  app.use('/api/mail', router);

  const agendaService = new AgendaService();

  router.get('/', (req, res) => {
    res.status(200).end('<h1>Bienvenido a UCABdemics!</h1>');
  });

  router.post('/recovery', async (req, res, next) => {
    const { email } = req.query;
    try {
      const response = await agendaService.sendWelcome({ user: email });
      res.status(201).json({
        data: response,
        message: 'mail sent',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/welcome', async (req, res, next) => {
    const { email } = req.query;
    try {
      const response = await AgendaService.agenda.on('ready', function () {
        AgendaService.agenda.now('welcome email', {
          user: email,
        });
      });
      res.status(201).json({
        data: response,
        message: 'mail sent',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = MailApi;
