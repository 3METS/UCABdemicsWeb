const mongoFunction = require('../lib/db').MongoLib;
const { ObjectId } = require('mongodb');

class ContenidoProgramaticoService{
    constructor(){
        this.MongoDB = new mongoFunction();
        this.collection = "contenidos-programaticos";
    }

    async crear(data){
        const exist = await this.MongoDB.get(this.collection, { "codigo": data.codigo });
        if (exist == null){
            const result = await this.MongoDB.create(this.collection, data);
            return result;
        }else{
            return "Ya existe"
        }
    }

    async buscarAsignatura (query){
        const result = await this.MongoDB.get(this.collection, query);

        if(result != null ){
            return result;
        }else{
            return null;
        }
    }

    async buscarCompetencias (query){
        const projection = { projection: { "competencias": 1 , "_id": 0} };
        const result = await this.MongoDB.getProjection(this.collection, query, projection);

        if (result != null){
            return result;
        }else{
            return null;
        }
    }

    async buscarHoras (query){
        const projection = { projection: { "horasSemanales": 1 , "_id": 0 } };
        const result = await this.MongoDB.getProjection(this.collection, query, projection);

        if (result != null){
            return result;
        }else{
            return null;
        }
    }

    async buscarAsignaturas (query){
        const result = await this.MongoDB.getAll(this.collection, query);

        if(result.length > 0 ){
            return result;
        }else{
            return null;
        } 
    }


}

module.exports = { ContenidoProgramaticoService };