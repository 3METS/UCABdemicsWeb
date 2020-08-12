const mongoFunction = require('../lib/db').MongoLib;

class PeriodoService {
  constructor() {
    this.MongoDB = new mongoFunction();
    this.collection = 'periodos-academico';
  }

    async crear(data) {
        const exist = await this.MongoDB.get(this.collection, {
        codigo: data.codigo,
        });
        if (exist == null) {
        const result = await this.MongoDB.create(this.collection, data);
            return result;
        } else {
            return 'Ya existe';
        }
    }   

    async buscar(data){
        const result = await this.MongoDB.get(this.collection, data);
        if (result)
            return result;
        return "No existe"
    }

    async buscarVarios(data){
        const result = await this.MongoDB.getAll(this.collection, data);
        if (result)
            return result;
        return "No existe"
    }

    async buscarCodigos (){
        const result = await this.MongoDB.getAll(this.collection,{});
        if (result.length > 0)
            return result;
        else
            return null;
    }

    async modificar (codigo, data){
        const result = await this.MongoDB.update(this.collection, codigo, data);

        if (result.result.nModified > 0){
            return true;
        }else{
            return false;
        }
    }

    async eliminar(codigo) {
        const busqueda = await this.MongoDB.get(this.collection, codigo);
        const id = busqueda._id.toString();
        const result = await this.MongoDB.delete(this.collection, id);

        if (result.deletedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = { PeriodoService };
