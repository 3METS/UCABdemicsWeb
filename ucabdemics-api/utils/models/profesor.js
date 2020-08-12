const joi = require('joi');

const carreraIdSchema = require('./carrera').carreraIdSchema;
const seccionIdSchema = require('./seccion').seccionIdSchema;

const profesorIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nombreSchema = joi.string().max(80);
const correoSchema = joi.string().max(100);
//const passwordSchema = joi.string().max(30);

const seccionesSchema = joi.array().items(seccionIdSchema);

const createProfesor = {
  cedula: profesorIdSchema.required(),
  nombre: nombreSchema.required(),
  correo: correoSchema.required(),
  carrera: carreraIdSchema.required(),
  secciones: seccionesSchema,
};

const updateProfesor = {
  cedula: profesorIdSchema,
  nombre: nombreSchema,
  correo: correoSchema,
  carrera: carreraIdSchema,
  secciones: seccionesSchema,
};

module.exports = {
  profesorIdSchema,
  createProfesor,
  updateProfesor,
};
