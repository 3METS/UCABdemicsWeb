const express = require('express');
const MailService = require('../services/mail');

function MailApi(app) {
  const router = express.Router();
  app.use('/api/mail', router);

  const mailService = new MailService();

  router.post('/', (req, res, next) => {
    const { email } = req.body;
    const response = mailService.sendRecovery({ user: email });

    if (!response.err) {
      next(response.err);
    }
    res.status(201).json({
      data: response.info,
      message: 'mail sent',
    });
  });
}

module.exports = MailApi;
