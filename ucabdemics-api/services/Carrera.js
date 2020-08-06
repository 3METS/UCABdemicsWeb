const mongoFunction = require('../lib/db').MongoLib;
const { ObjectId } = require('mongodb');

class CarreraService{
    constructor(){
        this.MongoDB = new mongoFunction();
        this.collection = "carreras";
    }

    async crear(data){
        const exist = await this.MongoDB.get(this.collection, { "codigo": data.codigo });
        console.log(exist);
        console.log("exist");
        if (exist == null){
            const result = await this.MongoDB.create(this.collection, data);
            return result; 
        }else{
            return "Ya existe"
        }
    }

    async buscarAsignaturas(query){
        const projection = { projection: { "asignaturas": 1, "_id": 0 } }
        const result = await this.MongoDB.getProjection(this.collection, query, projection);

        if (result != null){
            return result;
        }else{
            return null;
        }
    }
}

module.exports = { CarreraService };