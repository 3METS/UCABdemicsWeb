const MongoLib = require('../lib/db');

class PlanDeClaseService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'planes-clases';
  }

  async getPlanesDeClases({
    escuela,
    contenidoProgramatico,
    seccion,
    periodo,
    asignatura,
    profesor,
  }) {
    const query = {
      escuela,
      contenidoProgramatico,
      seccion,
      periodo,
      asignatura,
      profesor,
    };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const planesDeClases = await this.MongoDB.getAll(
      this.collection,
      query || null
    );
    return planesDeClases || [];
  }

  async getPlanDeClase({ id }) {
    const planDeClase = await this.MongoDB.get(this.collection, id);
    return planDeClase || [];
  }

  async createPlanDeClase({ planDeClase }) {
    const exist = await this.getPlanesDeClases({
      seccion: planDeClase.seccion,
    });
    if (exist.length) {
      throw new Error('El Plan De Clase ya existe');
    } else {
      return await this.MongoDB.create(this.collection, planDeClase);
    }
  }

  async updatePlanDeClase({ id, planDeClase }) {
    const exist = await this.getPlanDeClase({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, planDeClase);
    } else {
      throw new Error('El Plan De Clase no existe');
    }
  }

  async deletePlanDeClase({ id }) {
    const exist = await this.getPlanDeClase({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('El Plan De Clase no existe');
    }
  }
}

module.exports = PlanDeClaseService;
