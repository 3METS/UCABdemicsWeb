const joi = require('joi');

const seccionIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const { asignaturaIdSchema } = require('./Asignatura');
const { profesorIdSchema } = require('./Profesor');
const { periodoAcademicoIdSchema } = require('./PeriodoAcademico');
const { planClaseIdSchema } = require('./PlanDeClase');

const horarioSchema = joi.object({
  horaInicio: joi.string().max(10),
  duracion: joi.number().integer().min(1).max(6),
  dia: joi.string().max(10),
  aula: joi.string().max(10),
});

const horariosSchema = joi.array().items(horarioSchema);
const nrcSchema = joi.string().min(5).max(5);

const createSeccionSchema = joi.object({
  nrc: nrcSchema.required(),
  asignatura: asignaturaIdSchema.required(),
  profesor: profesorIdSchema.required(),
  horarios: horariosSchema.required(),
  periodoAcademico: periodoAcademicoIdSchema.required(),
  planDeClase: planClaseIdSchema.required(),
});

const updateSeccionSchema = joi.object({
  nrc: nrcSchema,
  asignatura: asignaturaIdSchema,
  profesor: profesorIdSchema,
  horarios: horariosSchema,
  periodoAcademico: periodoAcademicoIdSchema,
  planDeClase: planClaseIdSchema,
});

module.exports = {
  seccionIdSchema,
  createSeccionSchema,
  updateSeccionSchema,
};
