const mongoFunction = require('../lib/db').MongoLib;
const { ObjectId } = require('mongodb');

class SolicitudService {
    constructor(){
        this.MongoDB = new mongoFunction();
        this.collection = "solicitudes";
    }

    async crear (data){
        const exist = await this.MongoDB.get(this.collection, data);

        if(exist == null){
            const result = await this.MongoDB.create(this.collection, data);
            if (result != null){
                return result;
            }else{
                return "Error";
            }
        }else{
            return "Ya existe";
        }
    }

    async buscar(query){
        const result = await this.MongoDB.get(this.collection, query);

        if (result != null){
            return result;
        }else{
            return null;
        }
    }

    async buscarFecha(fecha){ //Recibe la fecha (el tipo de dato) para buscar las solicitudes realizadas
        const query = { "fecha": fecha };
        const result = await this.MongoDB.getAll(this.collection, query);

        if (result.length > 0){
            return result;
        }else{
            return null;
        }
    }

    async modificar(query, data){ //Es necesario recibir en query todos los datos de la solicitud
        const result = await this.MongoDB.update(this.collection, query, data);

        if (result.result.nModified > 0){
            return true;
        }else{
            return false;
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

module.exports = { SolicitudService }