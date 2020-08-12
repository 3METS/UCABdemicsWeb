const joi = require('joi');

const periodoAcademicoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const fechaInicioSchema = joi.string().max(20);
const fechaFinalSchema = joi.string().max(20);
const decripcionSchema = joi.string().max(300);

const createPeriodoAcademico = {
  fechaInicio: fechaInicioSchema.required(),
  fechaFinal: fechaFinalSchema.required(),
  descripcion: decripcionSchema.required(),
};

const updatePeriodoAcademico = {
  //Lo llamé rud porque funciona para todo menos create
  codigo: periodoAcademicoIdSchema,
  fechaInicio: fechaInicioSchema,
  fechaFinal: fechaFinalSchema,
  descripcion: decripcionSchema,
};

module.exports = {
  periodoAcademicoIdSchema,
  createPeriodoAcademico,
  updatePeriodoAcademico,
};
