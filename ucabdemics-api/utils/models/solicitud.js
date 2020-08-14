const joi = require('joi');

const solicitudIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const { profesorIdSchema } = require('./Profesor');
const { seccionIdSchema } = require('./Seccion');

const tipoSchema = joi
  .string()
  .max(50)
  .valid('Pendiente', 'Rechazado', 'Procesado');
const horaInicioSchema = joi.string().min(5).max(12);
const duracionSchema = joi.number().integer().min(1);
const fechaSchema = joi.string().min(12).max(12);
const statusSchema = joi.string();

const createSolicitudSchema = joi.object({
  tipo: tipoSchema.required(),
  horaInicio: horaInicioSchema.required(),
  duracion: duracionSchema.required(),
  fecha: fechaSchema.required(),
  profesor: profesorIdSchema.required(),
  seccion: seccionIdSchema.required(),
  status: statusSchema.required(),
});

const updateSolicitudSchema = joi.object({
  tipo: tipoSchema,
  horaInicio: horaInicioSchema,
  duracion: duracionSchema,
  fecha: fechaSchema,
  profesor: profesorIdSchema,
  seccion: seccionIdSchema,
  status: statusSchema,
});

module.exports = {
  solicitudIdSchema,
  createSolicitudSchema,
  updateSolicitudSchema,
};
