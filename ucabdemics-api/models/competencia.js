const joi = require('@hapi/joi');

const competenciaIdSchema = joi.string().max(30);

const nombreSchema = joi.string().max(80);
const descripcionSchema = joi.string();
// *******************************************
const criterioSchema = joi.string();

const unidadSchema = {
  unidad : joi.number().integer().min(0),
  nombre : joi.string().max(300),
  descripcion: joi.string(),
  criterios : joi.array().items(criterioSchema)
};

const unidadesSchema = joi.array().items(unidadSchema)
// *******************************************


const createCompetencia ={
  codigo : competenciaIdSchema.required(),
  nombre: nombreSchema.required(),
  descripcion: descripcionSchema.required(),
  unidadesCompetencia: unidadesSchema.required()
};

const updateCompetencia = {
  codigo : competenciaIdSchema,
  nombre: nombreSchema,
  descripcion: descripcionSchema,
  unidadesCompetencia: unidadesSchema
  };
  
module.exports = {
  competenciaIdSchema,
  createCompetencia,
  updateCompetencia
};