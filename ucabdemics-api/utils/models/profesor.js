const joi = require('joi');

const { carreraIdSchema } = require('./Carrera');
const { seccionIdSchema } = require('./Seccion');

const profesorIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const cedulaSchema = joi.string().min(7);
const nombreSchema = joi.string().max(80);
const carreraSchema = joi.array().items(carreraIdSchema);
const seccionesSchema = joi.array().items(seccionIdSchema);

const createProfesorSchema = joi.object({
  cedula: cedulaSchema.required(),
  nombre: nombreSchema.required(),
  carrera: carreraSchema.required(),
  secciones: seccionesSchema,
});

const updateProfesorSchema = joi.object({
  cedula: cedulaSchema,
  nombre: nombreSchema,
  carrera: carreraSchema,
  secciones: seccionesSchema,
});

module.exports = {
  profesorIdSchema,
  createProfesorSchema,
  updateProfesorSchema,
};
