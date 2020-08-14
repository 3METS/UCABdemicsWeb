const express = require('express');
const SolicitudService = require('../services/Solicitud');

const {
  solicitudIdSchema,
  createSolicitudSchema,
  updateSolicitudSchema,
} = require('../utils/models/solicitud');
const {
  validationHandler,
} = require('../utils/middlewares/validationHandlers');

function solicitudApi(app) {
  const router = express.Router();

  app.use('/api/solicitudes', router);

  const solicitudService = new SolicitudService();

  router.get('/', async (req, res, next) => {
    const { status, seccion, profesor, fecha } = req.query;
    try {
      const solicitudes = await solicitudService.getSolicitudes({
        status,
        seccion,
        profesor,
        fecha,
      });
      res.status(200).json(solicitudes);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:id',
    validationHandler(solicitudIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const solicitud = await solicitudService.getSolicitud({
          id,
        });
        res.status(200).json(solicitud);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createSolicitudSchema),
    async (req, res, next) => {
      const { body: solicitud } = req;
      try {
        const insertedSolicitudId = await solicitudService.createSolicitud({
          solicitud,
        });
        res.status(201).json(insertedSolicitudId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    ':id',
    validationHandler(solicitudIdSchema, 'params'),
    validationHandler(updateSolicitudSchema),
    async (req, res, next) => {
      const { id } = req.params;
      const { body: solicitud } = req;
      try {
        const updetedSolicitudId = await solicitudService.updateSolicitud({
          id,
          solicitud,
        });
        res.status(200).json(updetedSolicitudId);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    validationHandler(solicitudIdSchema, 'params'),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const deletedSolicitudId = await solicitudService.deleteSolicitud({
          id,
        });
        res.status(200).json(deletedSolicitudId);
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = solicitudApi;
