const joi = require('joi');

const solicitudIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const profesorIdSchema = require('./profesor').profesorIdSchema;
const seccionIdSchema = require('./seccion').seccionIdSchema;

const tipoSchema = joi.string().max(50);
const horaInicioSchema = joi.string().max(10);
const duracionSchema = joi.number().integer().min(1);
const fechaSchema = joi.string().max(50);

const createSolicitud = {
  codigo: solicitudIdSchema.required(),
  tipo: tipoSchema.required(),
  horaInicio: horaInicioSchema.required(),
  duracion: duracionSchema.required(),
  fecha: fechaSchema.required(),
  profesor: profesorIdSchema.required(),
  seccion: seccionIdSchema.required(),
};

const updateSolicitud = {
  codigo: solicitudIdSchema,
  tipo: tipoSchema,
  horaInicio: horaInicioSchema,
  duracion: duracionSchema,
  fecha: fechaSchema,
  profesor: profesorIdSchema,
  seccion: seccionIdSchema,
};

module.exports = {
  solicitudIdSchema,
  createSolicitud,
  updateSolicitud,
};
