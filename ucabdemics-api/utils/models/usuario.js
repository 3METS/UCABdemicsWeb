const joi = require('joi');

const usuarioIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const { profesorIdSchema } = require('./Profesor');

const correoSchema = joi.string().max(300);
const passwordSchema = joi.string().max(30);

const createUsuarioSchema = joi.object({
  correo: correoSchema.required(),
  password: passwordSchema.required(),
  repeatPassword: joi.ref('password'),
  profesor: profesorIdSchema.required(),
});

const updateUsuarioSchema = joi.object({
  correo: correoSchema,
  password: passwordSchema,
  repeatPassword: joi.ref('password'),
  profesor: profesorIdSchema,
});

module.exports = {
  usuarioIdSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
};
