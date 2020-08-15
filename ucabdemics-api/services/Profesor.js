const MongoLib = require('../lib/db');

class ProfesorService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'profesores';
  }

  async getProfesores({ cedula, nombre, profesor }) {
    const query = { cedula, nombre, profesor };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const profesores = await this.MongoDB.getAll(
      this.collection,
      query || null
    );
    return profesores || [];
  }

  async getProfesor({ id }) {
    const profesor = await this.MongoDB.get(this.collection, id);
    return profesor || [];
  }

  async createProfesor({ profesor }) {
    const exist = await this.getProfesores({ cedula: profesor.cedula });
    if (exist.length) {
      throw new Error('El profesor ya existe');
    } else {
      return await this.MongoDB.create(this.collection, profesor);
    }
  }

  async updateProfesor({ id, profesor }) {
    const exist = await this.getProfesor({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, profesor);
    } else {
      throw new Error('El profesor no existe');
    }
  }

  async deleteProfesor({ id }) {
    const exist = await this.getProfesor({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('El profesor no existe');
    }
  }
}

module.exports = ProfesorService;
