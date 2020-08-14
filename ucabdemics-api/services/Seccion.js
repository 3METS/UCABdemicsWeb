const MongoLib = require('../lib/db');

class SeccionService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'secciones';
  }

  async getSecciones({ nrc, asignatura, planClase, profesor, periodo }) {
    const query = { nrc, asignatura, planClase, profesor, periodo };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const secciones = await this.MongoDB.getAll(this.collection, query || null);
    return secciones || [];
  }

  async getSeccion({ id }) {
    const seccion = await this.MongoDB.get(this.collection, id);
    return seccion || [];
  }

  async createSeccion({ seccion }) {
    const exist = await this.getSecciones({ nrc: seccion.nrc });
    if (exist.length) {
      throw new Error('La seccion ya existe');
    } else {
      return await this.MongoDB.create(this.collection, seccion);
    }
  }

  async updateSeccion({ id, seccion }) {
    const exist = await this.getSeccion({ id });
    if (exist.length) {
      return await this.MongoDB.update(this.collection, id, seccion);
    } else {
      throw new Error('La seccion no existe');
    }
  }

  async deleteSeccion({ id }) {
    const exist = await this.getSeccion({ id });
    if (exist.length) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('La seccion no existe');
    }
  }
}

module.exports = SeccionService;
