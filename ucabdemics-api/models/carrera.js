const joi = require('@hapi/joi');
const competenciaIdSchema = require('./competencia').competenciaIdSchema;

const carreraIdSchema = joi.string().max(30);

const nombreSchema = joi.string().max(300);

const competenciasSchema =  joi.array().items(competenciaIdSchema);


const createCarrera ={
    carreraId : carreraIdSchema.required(),
    nombre: nombreSchema.required(),

    competencias: competenciasSchema.required()
};

const updateCarrera = {
    carreraId : carreraIdSchema,
    nombre: nombreSchema,

    competencias: competenciasSchema
  };
  
  module.exports = {
    carreraIdSchema,
    createCarrera,
    updateCarrera
  };