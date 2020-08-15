const joi = require('joi');

const usuarioIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const { profesorIdSchema } = require('./profesor');

const emailSchema = joi.string();
const passwordSchema = joi.string().max(30);
const isAdminSchema = joi.boolean();

const createUsuarioSchema = joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
  repeatPassword: joi.ref('password'),
  profesor: profesorIdSchema,
  isAdmin: isAdminSchema.required(),
});

const updateUsuarioSchema = joi.object({
  email: emailSchema,
  password: passwordSchema,
  repeatPassword: joi.ref('password'),
  profesor: profesorIdSchema,
  isAdmin: isAdminSchema,
});

module.exports = {
  usuarioIdSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
};
