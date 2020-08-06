const mongoFunction = require('../lib/db').MongoLib;
const { ObjectId } = require('mongodb');

class CompetenciaService{
    constructor(){
        this.MongoDB = new mongoFunction();
        this.collection = "competencias";
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
        const query = { "codigo": { $in: data } };
        const result = await this.MongoDB.getAll(this.collection, data);

        if (result.length > 0){
            return result;
        }else{
            return null;
        }
    }

    async eliminar (codigo){
        const busqueda = await this.MongoDB.get(this.collection, codigo);
        const id = busqueda._id.toString();
        const result = await this.MongoDB.delete(this.collection, id);

        if (result.deletedCount > 0){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = { CompetenciaService };