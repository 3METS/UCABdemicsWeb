const joi = require('@hapi/joi');
const competenciaIdSchema = require('./competencia').competenciaIdSchema;
// const asignaturaIdSchema = require('./contenidoProgramatico').contenidoProgramaticoIdSchema;

const carreraIdSchema = joi.string().max(30);

const nombreSchema = joi.string().max(300);

const competenciasSchema =  joi.array().items(competenciaIdSchema);


// const asignaturasSchema =  joi.array().items(asignaturaIdSchema);


const createCarrera ={
    codigo : carreraIdSchema.required(),
    nombre: nombreSchema.required(),

    competencias: competenciasSchema.required(),
    // asignaturas: asignaturasSchema
};

const updateCarrera = {
    codigo : carreraIdSchema,
    nombre: nombreSchema,

    competencias: competenciasSchema,
    // asignaturas: asignaturasSchema
  };
  
  module.exports = {
    carreraIdSchema,
    createCarrera,
    updateCarrera
  };