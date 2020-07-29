const joi = require('@hapi/joi');
const competenciaIdSchema = require('./competencia').competenciaIdSchema;

const carreraIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nombreSchema = joi.string().max(300);

const competenciasSchema =  joi.array().items(competenciaIdSchema);


const createCarrera ={
    nombre: nombreSchema.required(),

    competencias: competenciasSchema.required()
};

const updateCarrera = {
    nombre: nombreSchema,

    competencias: competenciasSchema
  };
  
  module.exports = {
    carreraIdSchema,
    createCarrera,
    updateCarrera
  };