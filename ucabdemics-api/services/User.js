const mongoFunction = require('../lib/db').mongoFunction;
const profesor = require('./Profesor').ProfesorService;
const { ObjectId } = require('mongodb');

class UsuarioService {
    constructor(){
        this.MongoDB = new mongoFunction();
        this.Profesor = new profesor();
        this.collection = "usuarios";
    };

    async crear(user){
        const query = {
            correo: user.correo, 
            contrasenia: user.contrasenia};
        const result = await this.MongoDB.get(this.collection, query);

        if (!result){
            const createdUserId = await this.MongoDB.create(this.collection, user);
            return createdUserId;
        }else{
            return "Este usuario ya existe";
        }
    };

    async agregarProfesor (userID, profesorID){
        const query = { _id: ObjectId(userID) };
        const exist = await this.MongoDB.get(this.collection, query );

        if(exist == null){
            return null;
        }else{
            const data = { profesor: profesorID};
            const result = await this.MongoDB.update(this.collection, query, data);
            if (result.result.nModified > 0){
                return true;
            }else{
                return false;
            }
        }
    }

    async signIn(data){
        const query = {
            correo: data.correo, 
            contrasenia: data.contrasenia};
        const userData = await this.MongoDB.get(this.collection, query);
        const profesorData = await this.Profesor.buscar({ _id: ObjectId(userData.profesor) });
        
        if ((userData != null) && (profesorData != null)){
            return {
                user: userData,
                profesor: profesorData,
                status: "2"
            };
        }else{
            if (userData != null){
                return {
                    user: userData,
                    profesor: null,
                    status: "1"
                };
            }else{
                return {
                    user: null,
                    profesor: null,
                    status: "0"
                };
            }
        }
    };

    async modificar (user, data){
        const query = {
            correo: user.correo
        };
        const result = await this.MongoDB.update(this.collection, query, data);

        if (result.result.nModified > 0){
            return true;
        }else{
            return false;
        }
    };

    async buscar (info){
        const result = await this.MongoDB.get(this.collection, info);

        if(result != null ){
            return result;
        }else{
            return null;
        }
    };

    async buscarVarios (info){
        const result = await this.MongoDB.getAll(this.collection, info);

        if (result.length > 0){
            return result;
        }else{
            return null;
        }
    }

    async eliminar (id){
        const result = await this.MongoDB.delete(this.collection, id);

        if (result.deletedCount > 0){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = { UsuarioService };