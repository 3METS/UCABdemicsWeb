const joi = require('@hapi/joi');

const periodoAcademicoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nombreSchema = joi.string().max(10);
const fechaInicioSchema = joi.string().max(20);
const fechaFinalSchema = joi.string().max(20);
const decripcionSchema = joi.string().max(300);

const createPeriodoAcademico ={
  nombre: nombreSchema.required(),
  fechaInicio: fechaInicioSchema.required(),
  fechaFinal: fechaFinalSchema.required(),
  descripcion: decripcionSchema.required()
};

const updatePeriodoAcademico = {
  nombre: nombreSchema,
  fechaInicio: fechaInicioSchema,
  fechaFinal: fechaFinalSchema,
  descripcion: decripcionSchema
};

module.exports = { 
  periodoAcademicoIdSchema,
  createPeriodoAcademico,
  updatePeriodoAcademico
};
  