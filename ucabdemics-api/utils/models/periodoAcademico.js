const joi = require('@hapi/joi');

const periodoAcademicoIdSchema = joi.string().max(10);

const fechaInicioSchema = joi.string().max(20);
const fechaFinalSchema = joi.string().max(20);
const decripcionSchema = joi.string().max(300);

const createPeriodoAcademico ={
  codigo: periodoAcademicoIdSchema.required(), //Ej. 2020-25
  fechaInicio: fechaInicioSchema.required(),
  fechaFinal: fechaFinalSchema.required(),
  descripcion: decripcionSchema.required()
};

const updatePeriodoAcademico = { //Lo llamé rud porque funciona para todo menos create
  codigo: periodoAcademicoIdSchema,
  fechaInicio: fechaInicioSchema,
  fechaFinal: fechaFinalSchema,
  descripcion: decripcionSchema
};

module.exports = {
  periodoAcademicoIdSchema,
  createPeriodoAcademico,
  updatePeriodoAcademico
};
  