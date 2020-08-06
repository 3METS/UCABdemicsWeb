const joi = require('@hapi/joi');

const solicitudIdSchema = joi.string().max(20);

const profesorIdSchema = require('./profesor').profesorIdSchema;
const seccionIdSchema = require('./seccion').seccionIdSchema;

const tipoSchema = joi.string().max(50);
const horaInicioSchema = joi.string().max(10);
const duracionSchema = joi.number().integer().min(1);
const fechaSchema = joi.string().max(50);
const statusSchema = joi.boolean().default(false);

const createSolicitud = {
    codigo : solicitudIdSchema.required(),
    tipo : tipoSchema.required(),
    horaInicio : horaInicioSchema.required(),
    duracion : duracionSchema.required(),
    fecha : fechaSchema.required(),
    profesor : profesorIdSchema.required(),
    seccion : seccionIdSchema.required(),
    status : statusSchema
};

const updateSolicitud = {
    codigo : solicitudIdSchema,
    tipo : tipoSchema,
    horaInicio : horaInicioSchema,
    duracion : duracionSchema,
    fecha : fechaSchema,
    profesor : profesorIdSchema,
    seccion : seccionIdSchema,
    status : statusSchema
};

module.exports = {
    solicitudIdSchema,
    createSolicitud,
    updateSolicitud
};