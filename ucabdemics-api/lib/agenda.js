const Agenda = require('agenda');
const MongoLib = require('./db');
const { config } = require('../config/index');

const uri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;

class AgendaLib {
  constructor() {
    this.collection = 'agendaJobs';
    this.jobTypes = config.jobTypes;
    this.agenda = new Agenda({
      db: { address: uri, collection: this.collection },
    });
  }

  async getMongoClient() {
    const dbLib = new MongoLib();
    return dbLib.getClient();
  }

  startJobs() {
    this.jobTypes.forEach((type) => {
      require('../utils/jobs/' + type)(this.agenda);
    });

    if (this.jobTypes.length) {
      this.agenda.on('ready', function () {
        return this.agenda.start();
      });
    }
  }
}

module.exports = AgendaLib;
