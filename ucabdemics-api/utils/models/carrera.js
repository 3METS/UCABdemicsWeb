const joi = require('joi');
const { competenciaIdSchema } = require('./Competencia');
const { asignaturaIdSchema } = require('./Asignatura');

const carreraIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nombreSchema = joi.string().min(10).max(80);
const competenciasSchema = joi.array().items(competenciaIdSchema).sparse();
const asignaturasSchema = joi.array().items(asignaturaIdSchema).sparse();

const createCarreraSchema = joi.object({
  nombre: nombreSchema.required(),
  competencias: competenciasSchema.required(),
  asignaturas: asignaturasSchema.required(),
});

const updateCarreraSchema = joi.object({
  nombre: nombreSchema,
  competencias: competenciasSchema,
  asignaturas: asignaturasSchema,
});

module.exports = {
  carreraIdSchema,
  createCarreraSchema,
  updateCarreraSchema,
};
