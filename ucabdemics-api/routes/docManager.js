const express = require('express');
const DocManagementService = require('../services/DocManagement');

function docManagerApi(app) {
  const router = express.Router();

  app.use('/api/docManager', router);

  const docManagementService = new DocManagementService();

  router.get('/plan/', (req, res, next) => {
    const { period, seccion, asignatura } = req.query;

    const filePath = docManagementService.getFile({
      period,
      seccion,
      asignatura,
    });
    if (filePath) {
      res.status(200).download(filePath, `file.docx`);
    } else {
      next(new Error('File not found.'));
    }
  });

  router.post('/plan', async (req, res, next) => {
    const { period, seccion, asignatura } = req.body;
    try {
      const job = await docManagementService.writeClassPlan({
        data: { period, seccion, asignatura },
      });
      res.status(200).json({ job, message: 'generating document' });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = docManagerApi;
