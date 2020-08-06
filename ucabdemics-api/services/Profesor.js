const mongoFunction = require('../lib/db').MongoLib;
const { ObjectId } = require('mongodb');

class ProfesorService {
  constructor() {
    this.MongoDB = new mongoFunction();
    this.collection = 'profesores';
  }

  async crear(profesor, userID) {
    const query = {
      correo: profesor.correo,
    };
    const existeProfesor = await this.MongoDB.get(this.collection, query);
    const existeUsuario = await this.MongoDB.get('usuarios', {
      _id: ObjectId(userID),
    });

    if (
      !existeProfesor &&
      existeUsuario != null &&
      existeUsuario.correo == profesor.correo
    ) {
      const profesorId = await this.MongoDB.create(this.collection, profesor);

      return profesorId;
    } else {
      return 'Este usuario ya existe';
    }
  }

  async modificar(profesor, data) {
    const query = {
      correo: profesor.correo,
    };
    const result = await this.MongoDB.update(this.collection, query, data);

    if (result.result.nModified > 0) {
      return true;
    } else {
      return false;
    }
  }

  async buscar(query) {
    const result = await this.MongoDB.get(this.collection, query);

    if (result != null) {
      return result;
    } else {
      return null;
    }
  }

  async buscarVarios(query) {
    const result = await this.MongoDB.getAll(this.collection, query);

    if (result.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async eliminar(id) {
    const result = await this.MongoDB.delete(this.collection, id);

    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = { ProfesorService };
