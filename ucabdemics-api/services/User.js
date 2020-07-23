const MongoLib = require('../mgLib/db');

class UserService {
  constructor() {
    this.MongoDB = new MongoLib();
  }

  async createUser(collection, user) {
    const createdUserId = await this.MongoDB.create(collection, user);
    return createdUserId;
  }

  async signIn(data) {
    const query = { correo: data.correo, contrasenia: data.contrasenia };
    const result = await this.MongoDB.get('usuarios', query);

    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
