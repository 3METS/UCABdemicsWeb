const express = require('express');
const UsuarioService = require('../services/Usuario');

const {
  usuarioIdSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
} = require('../utils/models/usuario');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function usuarioApi(app) {
  const router = express.Router();

  app.use('/api/usuarios', router);

  const usuarioService = new UsuarioService();

  router.get('/', async (req, res, next) => {
    const { correo, profesor } = req.query;
    try {
      const usuarios = await usuarioService.getUsuarios({ correo, profesor });
      res.status(200).json(usuarios);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:id',
    validationHandler(usuarioIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const usuario = await usuarioService.getUsuario({
          id,
        });
        res.status(200).json(usuario);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createUsuarioSchema),
    async (req, res, next) => {
      const { body: usuario } = req;
      try {
        const insertedUsuarioId = await usuarioService.createUsuario({
          usuario,
        });
        res.status(201).json(insertedUsuarioId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    ':id',
    validationHandler(usuarioIdSchema, 'params'),
    validationHandler(updateUsuarioSchema),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: usuario } = req;
      try {
        const updetedUsuarioId = await usuarioService.updateUsuario({
          id,
          usuario,
        });
        res.status(200).json(updetedUsuarioId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    validationHandler(usuarioIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedUsuarioId = await usuarioService.deleteUsuario({ id });
        res.status(200).json(deletedUsuarioId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = usuarioApi;
