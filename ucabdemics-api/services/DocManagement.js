const BullService = require('./bull');

class DocManagementService {
  constructor() {
    this.documentsPath = __dirname + '/./../documents/';
    this.bull = new BullService('createFile');
  }

  writeClassPlan({ data }) {
    return this.bull.addJobs({ data });
  }

  getFile({ period, seccion, asignatura }) {
    if (!period || !seccion || !asignatura) {
      return null;
    }
    return `${this.documentsPath}${period} - ${asignatura} - ${seccion}.docx`;
  }
}

module.exports = DocManagementService;
