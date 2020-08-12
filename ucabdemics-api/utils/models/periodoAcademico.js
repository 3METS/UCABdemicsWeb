const joi = require('joi');

const periodoAcademicoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const fechaInicioSchema = joi.string().min(12).max(12);
const fechaFinalSchema = joi.string().min(12).max(12);
const decripcionSchema = joi.string().max(100);

const createPeriodoAcademico = {
  fechaInicio: fechaInicioSchema.required(),
  fechaFinal: fechaFinalSchema.required(),
  descripcion: decripcionSchema.required(),
};

const updatePeriodoAcademico = {
  fechaInicio: fechaInicioSchema,
  fechaFinal: fechaFinalSchema,
  descripcion: decripcionSchema,
};

module.exports = {
  periodoAcademicoIdSchema,
  createPeriodoAcademico,
  updatePeriodoAcademico,
};
