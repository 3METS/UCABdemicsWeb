const joi = require('@hapi/joi');

const profesorIdSchema = require('./profesor').profesorIdSchema;

// const usuarioIdSchema = joi.string();

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
    createUsuario,
    updateUsuario
}