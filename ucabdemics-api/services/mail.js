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

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sendWelcome({ user }) {
    var mailOptions = {
      from: `"UCABdemics Team" <${config.email}>`,
      to: user,
      subject: '¡Bienvenido a UCABdemics!',
      text: `<h1>¡Bienvenido a UCABdemics!</h1>
      <p>Gracias por registrarse en nuestra aplicación</p>
      `,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          resolve(true);
        }
      });
    });
  }

  sendRecovery({ user }) {
    var recoveryCode = this.getRndInteger(100000, 999999);
    var mailOptions = {
      from: `"UCABdemics Team" <${config.email}>`,
      to: user,
      subject: 'Recuperación de contraseña',
      text: `Su codigo de recuperacion: ${recoveryCode}`,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          resolve(recoveryCode);
        }
      });
    });
  }
}

module.exports = MailService;
