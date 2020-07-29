const joi = require('@hapi/joi');

const profesorIdSchema = require('./profesor').profesorIdSchema;

const usuarioIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const correoSchema = joi.string().max(300);
const passwordSchema = joi.string().max(30);

const createUsuario = {
    correo : correoSchema.required(),
    password : passwordSchema.required(),
    profesor : profesorIdSchema.required()
};

const updateUsuario = {
    correo : correoSchema,
    password : passwordSchema,
    profesor : profesorIdSchema
};

module.exports = {
    usuarioIdSchema,
    createUsuario,
    updateUsuario
}