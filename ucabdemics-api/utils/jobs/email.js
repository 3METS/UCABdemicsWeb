const MailService = require('../../services/mail');

module.exports = function (agenda) {
  const mailService = new MailService();

  agenda.define('welcome email', (job) => {
    const user = job.attrs.data.email;
    return mailService.sendWelcome({ user });
  });

  agenda.define('reset password', (job) => {
    const user = job.attrs.data.email;
    return mailService.sendRecovery({ user });
  });
};
