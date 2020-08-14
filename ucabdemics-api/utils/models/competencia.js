const joi = require('joi');

const competenciaIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nombreSchema = joi.string().min(2).max(10);
const descripcionSchema = joi.string().min(10).max(80);
const criterioSchema = joi.string().min(10).max(100);

const unidadSchema = joi.object({
  unidad: joi.number().integer().min(1),
  nombre: joi.string().min(10).max(300),
  descripcion: descripcionSchema,
  criterios: joi.array().items(criterioSchema),
});

const unidadesSchema = joi.array().items(unidadSchema);

const createCompetenciaSchema = joi.object({
  nombre: nombreSchema.required(),
  descripcion: descripcionSchema.required(),
  unidadesCompetencia: unidadesSchema.required(),
});

const updateCompetenciaSchema = joi.object({
  nombre: nombreSchema,
  descripcion: descripcionSchema,
  unidadesCompetencia: unidadesSchema,
});

module.exports = {
  competenciaIdSchema,
  createCompetenciaSchema,
  updateCompetenciaSchema,
};
