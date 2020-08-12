const MongoLib = require('../lib/db');

class AsignaturaService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'contenido-programaticos';
  }

  async getAsignaturas({ carrera, codigo, semestre, departamento }) {
    const query = {
      carrera,
      codigo,
      semestre,
      departamento,
    };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });
    const asignaturas = await this.MongoDB.getAll(this.collection, query);
    return asignaturas || [];
  }

  async getAsignatura({ id }) {
    const asignatura = await this.MongoDB.get(this.collection, id);
    return asignatura || [];
  }
}

module.exports = AsignaturaService;
