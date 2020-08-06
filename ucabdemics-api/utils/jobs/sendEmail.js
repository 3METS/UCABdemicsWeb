const { config } = require('../../config/index');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
});

function sendWelcome({ user }) {
  var mailOptions = {
    from: `"UCABdemics Team" <${config.email}>`,
    to: user,
    subject: '¡Bienvenido a UCABdemics!',
    html: `<h1>¡Bienvenido a UCABdemics!</h1>
      <p>Gracias por registrarse en nuestra aplicación</p>
      `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
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

function sendRecovery({ name, user, recovery }) {
  var mailOptions = {
    from: `"UCABdemics Team" <${config.email}>`,
    to: user,
    subject: 'Recuperación de contraseña',
    html: `
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
    </head>
    <style>
    h1{
        text-align: center;
    }
</style>
<body>
    <h4>Hola ${name},</h4>
    <p>Hemos recibido una solicitud de recuperación de contraseña. Su codigo de recuperación es:</p>
    <h1>${recovery}</h1>
    <p>Si no hiciste una solicitud de recuperación, ignora este correo o responde este correo para hacernos saber.</p>
    <br>
    <p>Gracias,<br>Equipo UCABdemics</p>
</body>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
        return false;
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = async function (job, done) {
  if (job.data.info.option === 'welcome') {
    try {
      await sendWelcome({ user: job.data.info.email });
      job.progress(100);
      done();
    } catch (err) {
      done(new Error({ sent: false }));
    }
  } else if (job.data.info.option === 'recovery') {
    try {
      await sendRecovery({
        name: job.data.info.name,
        user: job.data.info.email,
        recovery: job.data.info.recoveryCode,
      });
      job.progress(100);
      done();
    } catch (err) {
      done(new Error({ sent: false }));
    }
  }
};
