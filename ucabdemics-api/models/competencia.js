const joi = require('@hapi/joi');

const competenciaIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nombreSchema = joi.string().max(80);
const descripcionSchema = joi.string().max(300);
// *******************************************
const criterioSchema = joi.string().max(300);

const unidadSchema = {
  unidad : joi.number().integer().min(0),
  nombre : joi.string().max(300),
  descripcion: joi.string().max(100),
  criterios : joi.array().items(criterioSchema),
};

const unidadesSchema = joi.array().items(unidadSchema);
// *******************************************


const createCompetencia ={
  nombre: nombreSchema.required(),
  descripcion: descripcionSchema.required(),
  unidades_Competencia: unidadesSchema.required()
};

const updateCompetencia = {
  nombre: nombreSchema,
  descripcion: descripcionSchema,
  unidades_Competencia: unidadesSchema
  };
  
module.exports = {
  competenciaIdSchema,
  createCompetencia,
  updateCompetencia
};