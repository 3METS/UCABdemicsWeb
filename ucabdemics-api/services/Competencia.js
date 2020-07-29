const mongoFunction = require('../lib/db').MongoLib;
const { ObjectId } = require('mongodb');

class CompetenciaService{
    constructor(){
        this.MongoDB = new mongoFunction();
        this.collection = "competencias";
    }

    async buscar(query){
        const result = await this.MongoDB.get(this.collection, query);

        if (result != null){
            return result;
        }else{
            return null;
        }
    }

    async buscarUnidades (query){
        const projection = { projection: { "unidadesCompetencia": 1, "_id": 0 } };
        const result = await this.MongoDB.getProjection(this.collection, query, projection);

        if (result != null ){
            return result;
        }else{
            return null;
        }
    }

    async buscarVarios (data){ // Recibe un array con las competencias. Ex: ["CG2","CPE1"]
        const query = { "competencia": { $in: data } };
        const result = await this.MongoDB.getAll(this.collection, query);

        if (result.length > 0){
            return result;
        }else{
            return null;
        }
    }
}

module.exports = { CompetenciaService };