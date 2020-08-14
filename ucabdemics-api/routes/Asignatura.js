const express = require('express');
const AsignaturaService = require('../services/Asignatura');

function asignaturaApi(app) {
  const router = express.Router();
  app.use('/api/asignaturas', router);

  const asignaturaService = new AsignaturaService();

  router.get('/', async (req, res, next) => {
    const { carrera, codigo, semestre, departamento } = req.query;
    try {
      const asignaturas = await asignaturaService.getAsignaturas({
        carrera,
        codigo,
        semestre,
        departamento,
      });
      res.status(200).json(asignaturas);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const asignatura = await asignaturaService.getAsignatura({
        id,
      });
      res.status(200).json(asignatura);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = asignaturaApi;
