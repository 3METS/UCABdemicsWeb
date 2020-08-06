const DocxTemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const documentsPath = __dirname + '/./../documents/';

function parser(tag) {
  return {
    get(scope, context) {
      const regex = new RegExp(/\w+#[0-9]{1,}/);
      if (tag === '.') {
        return scope;
      }
      if (tag.match(regex.source) !== null) {
        var newTag = tag.replace(/#[0-9]{1,}/, '');
        var index = parseInt(tag.match(/[0-9]/)[0]);
        return scope[newTag][index - 1];
      }
      if (tag === '$index') {
        const indexes = context.scopePathItem;
        return indexes[indexes.length - 1] + 1;
      }
      if (scope[tag] === undefined || scope[tag] === null) {
        return '';
      }
      return scope[tag];
    },
  };
}

class DocxTemplaterLib {
  writeDocument(data) {
    var response = {
      fileName: null,
      path: null,
      err: null,
    };

    var templateDoc = fs.readFileSync(
      __dirname + '/templates/plan-clase-template.docx',
      'binary'
    );

    var pizzip = new PizZip(templateDoc);
    try {
      var doc = new DocxTemplater(pizzip, { parser: parser });
      doc.setData(data);
      doc.render();
    } catch (err) {
      response = {
        ...response,
        err,
      };
      return response;
    }

    var buf = doc.getZip().generate({ type: 'nodebuffer' });
    var fileName = `${data.period} - ${data.asignatura} - ${data.seccion}.docx`;
    var newDocPath = documentsPath + fileName;
    fs.writeFileSync(newDocPath, buf);
    response = {
      ...response,
      path: newDocPath,
      fileName,
    };
    return response;
  }
}

module.exports = DocxTemplaterLib;
