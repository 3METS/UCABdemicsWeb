const MongoLib = require('../lib/db');

class PeriodoService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'periodos-academico';
  }

  async getPeriodos({ termino, fechaInicio }) {
    const query = { termino, fechaInicio };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const periodos = await this.MongoDB.getAll(this.collection, query || null);
    return periodos || [];
  }

  async getPeriodo({ id }) {
    const periodo = await this.MongoDB.get(this.collection, id);
    return periodo || [];
  }

  async createPeriodo({ periodo }) {
    const exist = await this.getPeriodos({ termino: periodo.termino });
    if (exist.length) {
      throw new Error('El periodo ya existe');
    } else {
      return await this.MongoDB.create(this.collection, periodo);
    }
  }

  async updatePeriodo({ id, periodo }) {
    const exist = await this.getPeriodo({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, periodo);
    } else {
      throw new Error('El periodo no existe');
    }
  }

  async deletePeriodo({ id }) {
    const exist = await this.getPeriodo({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('El periodo no existe');
    }
  }
}

module.exports = PeriodoService;
