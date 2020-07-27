const { config } = require('../config/index');
const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email,
        pass: config.emailPassword,
      },
    });
  }

  sendRecovery({ user }) {
    var mailOptions = {
      from: config.email,
      to: user,
      subject: 'Recuperación de contraseña',
      text: 'Esto es una prueba',
    };
    var response = {
      err: null,
      info: null,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        response.err = error;
      } else {
        response.info = info.response;
        console.log('Email sent: ' + info.response);
      }
    });
    return response;
  }
}

module.exports = MailService;
