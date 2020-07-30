const mongoFunction = require('../lib/db').MongoLib;
const { ObjectId } = require('mongodb');

class SeccionService{
    constructor(){
        this.MongoDB = new mongoFunction();
        this.collection = "secciones";
    }

    async crear(data){ 
        const query = { "nrc": data.nrc };
        const exist = await this.MongoDB.get(this.collection, query);

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

    async modificarSinHorario(query, data){
        const result = await this.MongoDB.update(this.collection, query, data);

        if (result.result.nModified > 0){
            return true;
        }else{
            return false;
        }
    }

    async modificarHorario(NRC, diaOrigen, horaI, data){
        const query = {
            "nrc": NRC
        }
        const info = {
            "horarios.$[filter].horaInicio": data.horaInicio,
            "horarios.$[filter].horaFinal": data.horaFinal,
            "horarios.$[filter].diaSemana": data.diaSemana,
            "horarios.$[filter].aula": data.aula
        }
        const option = {
            arrayFilters: [{ "filter.diaSemana": diaOrigen }, { "filter.horaInicio": horaI }]
        }
        
        const result = await this.MongoDB.updateOption(this.collection, query, info, option);

        if (result.result.nModified > 0){
            return true;
        }else{
            return false;
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

    async eliminar (id){
        const result = await this.MongoDB.delete(this.collection, id);

        if (result.deletedCount > 0){
            return true;
        }else{
            return false;
        }
    };
}

module.exports = { SeccionService };