const mongoFunction = require('../lib/db').MongoLib;

class AsignaturaService {
  constructor() {
    this.MongoDB = new mongoFunction();
    this.collection = 'contenido-programaticos';
  }

  async buscarAsignatura(query) {
    const result = await this.MongoDB.get(this.collection, query);

    if (result != null) {
      return result;
    } else {
      return null;
    }
  }

  async buscarCompetencias(query) {
    const projection = { projection: { competencias: 1, _id: 0 } };
    const result = await this.MongoDB.getProjection(
      this.collection,
      query,
      projection
    );

    if (result != null) {
      return result;
    } else {
      return null;
    }
  }
}

module.exports = { AsignaturaService };
