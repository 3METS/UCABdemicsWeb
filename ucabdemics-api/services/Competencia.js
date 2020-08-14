const MongoLib = require('../lib/db');

class CompetenciaService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'competencias';
  }

  async getCompetencias({ competencia }) {
    const query = { competencia };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const competencias = await this.MongoDB.getAll(this.collection, query);
    return competencias || [];
  }

  async getCompetencia({ id }) {
    const competencia = await this.MongoDB.get(this.collection, id);
    return competencia || [];
  }
}

module.exports = CompetenciaService;
