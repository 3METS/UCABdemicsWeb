const joi = require('joi');

const periodoAcademicoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const terminoSchema = joi.string().min(6).max(6);
const fechaInicioSchema = joi.string().min(12).max(12);
const fechaFinalSchema = joi.string().min(12).max(12);
const decripcionSchema = joi.string().max(100);

const createPeriodoAcademico = {
  termino: terminoSchema.required(),
  fechaInicio: fechaInicioSchema.required(),
  fechaFinal: fechaFinalSchema.required(),
  descripcion: decripcionSchema.required(),
};

const updatePeriodoAcademico = {
  termino: terminoSchema,
  fechaInicio: fechaInicioSchema,
  fechaFinal: fechaFinalSchema,
  descripcion: decripcionSchema,
};

module.exports = {
  periodoAcademicoIdSchema,
  createPeriodoAcademico,
  updatePeriodoAcademico,
};
