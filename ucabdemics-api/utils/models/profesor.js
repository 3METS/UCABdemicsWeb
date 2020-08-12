const joi = require('joi');

const { carreraIdSchema } = require('./Carrera');
const { seccionIdSchema } = require('./Seccion');

const profesorIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nombreSchema = joi.string().max(80);
const correoSchema = joi.string().max(100);

const seccionesSchema = joi.array().items(seccionIdSchema);

const createProfesor = joi.object({
  cedula: profesorIdSchema.required(),
  nombre: nombreSchema.required(),
  carrera: carreraIdSchema.required(),
  secciones: seccionesSchema,
});

const updateProfesor = joi.object({
  cedula: profesorIdSchema,
  nombre: nombreSchema,
  correo: correoSchema,
  carrera: carreraIdSchema,
  secciones: seccionesSchema,
});

module.exports = {
  profesorIdSchema,
  createProfesor,
  updateProfesor,
};
