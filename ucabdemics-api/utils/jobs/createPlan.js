const DocxTemplaterLib = require('../../lib/doctemplater');

module.exports = function (job, done) {
  const doctemplater = new DocxTemplaterLib();
  const response = doctemplater.writeDocument(job.data.info);
  if (response.err) {
    done(new Error(response.err));
  }
  done(null, response.path);
};
