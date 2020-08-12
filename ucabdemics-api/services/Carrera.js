const MongoLib = require('../lib/db');

class CarreraService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'carreras';
  }

  async getCarreras({ nombre, competencia, asignatura }) {
    const query = {
      nombre,
      competencia,
      asignatura,
    };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const carreras = await this.MongoDB.getAll(this.collection, query);
    return carreras || [];
  }

  async getCarrera({ id }) {
    const carrera = await this.MongoDB.get(this.collection, id);
    return carrera || [];
  }

  async createCarrera({ carrera }) {
    const createdCarreraId = this.MongoDB.create(this.collection, carrera);
    return createdCarreraId;
  }

  async updateCarrera({ data, id }) {
    const updatedCarreraId = await this.MongoDB.update(
      this.collection,
      id,
      data
    );
    return updatedCarreraId;
  }

  async deleteCarrera({ id }) {
    const deletedCarreraId = await this.MongoDB.delete(this.collection, id);
    return deletedCarreraId;
  }
}

module.exports = CarreraService;
