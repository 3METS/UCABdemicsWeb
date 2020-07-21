const mongoFunction = require('../mgLib/db');

class apiService {
    constructor(){
        this.MongoDB = new mongoFunction();
    }

    async createUser(collection, user){
        const createdUserId = await this.MongoDB.create(collection, user);
        return createdUserId;
    }

    async signIn(data){
        const query = {correo: data.correo, contrasenia: data.contrasenia};
        const result = await this.MongoDB.get("usuarios",query);
        
        if (result){
            return true;
        }else{
            return false;
        }
    }
}