const mongoFunction = require('../lib/db').MongoLib;
//const { ObjectId } = require('mongodb');

class CarreraService {
  constructor() {
    this.MongoDB = new mongoFunction();
    this.collection = 'carreras';
  }

  async buscarAsignaturas(query) {
    const projection = { projection: { asignaturas: 1, _id: 0 } };
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

module.exports = { CarreraService };
