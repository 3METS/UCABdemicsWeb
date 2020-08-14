const MongoLib = require('../lib/db');

class CompetenciaService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'competencias';
  }

  async getCompetencias({ competencia }) {
    const query = { competencia };
    const competencias = await this.MongoDB.getAll(
      this.collection,
      query || null
    );
    return competencias || [];
  }

  async getCompetencia({ id }) {
    const competencia = await this.MongoDB.get(this.collection, id);
    return competencia || [];
  }
}

module.exports = CompetenciaService;
