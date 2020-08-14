const BullService = require('./bull');

class MailService {
  constructor() {
    this.bullService = new BullService('email');
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sendWelcome({ email, res }) {
    return this.bullService.addJobs({
      data: { email, option: 'welcome' },
      res,
    });
  }

  sendRecovery({ name, email, res }) {
    var recoveryCode = this.getRndInteger(100000, 999999);
    this.bullService.addJobs({
      data: { name, email, recoveryCode, option: 'recovery' },
      res,
    });
    return recoveryCode;
  }
}

module.exports = MailService;
