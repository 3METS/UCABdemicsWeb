const Excel = require('exceljs');
const savePath = __dirname + '/./../documents/Seguimientos/';
const templatePath = __dirname + '/./templates/seguimiento-template.xlsx';

class ExcelJsLib {
  async createSeguimiento({ data }) {
    const workbook = await new Excel.Workbook().xlsx.readFile(templatePath);
    this.__fillPrimaryData({
      data,
      worksheet: workbook.getWorksheet('Asignatura'),
    });
    workbook.xlsx.writeFile(savePath + 'file1.xlsx');
  }

  __fillPrimaryData({ data, worksheet }) {
    let cell = worksheet.getCell('B4');
    cell.value = data.profesor;

    cell = worksheet.getCell('B5');
    cell.value = data.seccion;

    cell = worksheet.getCell('B6');
    cell.value = data.nrc;

    cell = worksheet.getCell('D4');
    cell.value = data.periodo;

    cell = worksheet.getCell('D5');
    cell.value = data.semestre;

    cell = worksheet.getCell('B7');
    cell.value = data.asignatura;
  }
}

module.exports = ExcelJsLib;

/* const data = {
  profesor: 'Nidia Marcano',
  seccion: '401',
  nrc: '25485',
  asignatura: 'Introduccion a la Informatica',
  semestre: 'Primero',
  periodo: '202015',
};

const lib = new ExcelJsLib();

function test() {
  lib.createSeguimiento({ data });
}

test(); */
