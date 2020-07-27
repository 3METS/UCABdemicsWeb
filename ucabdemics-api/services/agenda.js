const AgendaLib = require('../lib/agenda');

const agendaLib = new AgendaLib();

class AgendaService {
  sendWelcome({ user }) {
    agendaLib.agenda.on('ready', function () {
      agendaLib.agenda.now('welcome email', { user }).then((data) => {
        console.log(data);
      });
    });
  }
}

module.exports = AgendaService;
