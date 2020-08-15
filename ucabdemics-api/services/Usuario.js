const MongoLib = require('../lib/db');
const bcrypt = require('bcrypt');

class UsuarioService {
  constructor() {
    this.MongoDB = new MongoLib();
    this.collection = 'usuarios';
  }

  async getUsuarios({ email, profesor }) {
    const query = { email, profesor };

    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const usuarios = await this.MongoDB.getAll(this.collection, query);
    return usuarios || [];
  }

  async getUsuario({ id }) {
    const usuario = await this.MongoDB.get(this.collection, id);
    return usuario || [];
  }

  async createUsuario({ usuario }) {
    const exist = await this.getUsuarios({ email: usuario.email });
    if (exist.length) {
      throw new Error('El usuario ya existe');
    } else {
      const hashedPassword = await bcrypt.hash(usuario.password, 10);
      return await this.MongoDB.create(this.collection, {
        ...usuario,
        password: hashedPassword,
      });
    }
  }

  async updateUsuario({ id, usuario }) {
    const exist = await this.getUsuario({ id });
    if (exist._id) {
      return await this.MongoDB.update(this.collection, id, usuario);
    } else {
      throw new Error('El usuario no existe');
    }
  }

  async deleteUsuario({ id }) {
    const exist = await this.getUsuario({ id });
    if (exist._id) {
      return await this.MongoDB.delete(this.collection, id);
    } else {
      throw new Error('El usuario no existe');
    }
  }
}

module.exports = UsuarioService;
