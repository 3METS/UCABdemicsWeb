const MongoLib = require('../lib/db');

class SolicitudService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'solicitudes';
  }

  async getSolicitudes({ status, seccion, profesor, fecha }) {
    const query = { status, seccion, profesor, fecha };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const solicitudes = await this.MongoDB.getAll(
      this.collection,
      query || null
    );
    return solicitudes || [];
  }

  async getSolicitud({ id }) {
    const solicitud = await this.MongoDB.get(this.collection, id);
    return solicitud || [];
  }

  async createSolicitud({ solicitud }) {
    const exist = await this.getSolicitudes({
      seccion: solicitud.seccion,
      profesor: solicitud.profesor,
      fecha: solicitud.fecha,
      tipo: solicitud.tipo,
    });
    if (exist.length) {
      throw new Error('La solicitud ya existe');
    } else {
      return await this.MongoDB.create(this.collection, solicitud);
    }
  }

  async updateSolicitud({ id, solicitud }) {
    const exist = await this.getSolicitud({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, solicitud);
    } else {
      throw new Error('La solicitud no existe');
    }
  }

  async deleteSolicitud({ id }) {
    const exist = await this.getSolicitud({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('La solicitud no existe');
    }
  }
}

module.exports = SolicitudService;
