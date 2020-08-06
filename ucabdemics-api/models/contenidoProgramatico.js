const joi = require('@hapi/joi');


const carreraIdSchema = require('./carrera').carreraIdSchema;
const competenciaIdSchema = require('./competencia').competenciaIdSchema;

const contenidoProgramaticoIdSchema = joi.string().max(30);

// const codigoSchema = joi.string().max(20);
const nombreSchema = joi.string().max(100);
const departamentoSchema = joi.string().max(100);
const regimenSchema = joi.string().max(100);
const ucSchema = joi.number().integer().min(1);
const semestreSchema = joi.string().max(30);
const tipoSchema = joi.string().max(100);
const justificacionSchema = joi.string();
// ****************************************
const horasSemanalesSchema = joi.object({
  teoricas: joi.number().integer().min(0),
  practicas: joi.number().integer().min(0),
  laboratorios: joi.number().integer().min(0),
});
// ****************************************
const competenciasSchema = joi.array().items(competenciaIdSchema);
// ****************************************
const subtemaSchema = joi.string();

const tematicaSchema = joi.object({
  tema : joi.number().integer().min(1),
  descripcion : joi.string().max(300),
  subtemas : joi.array().items(subtemaSchema)
});

const tematicasSchema = joi.array().items(tematicaSchema);
// *****************************************
const estrategiaAprendizajeSchema = joi.string().max(300);
const estrategiaEvaluacionSchema = joi.string().max(300);

const prelacionRequisitoSchema = joi.array().items(contenidoProgramaticoIdSchema);
const asignaturaAporteSchema = joi.array().items(contenidoProgramaticoIdSchema);

const createContenidoProgramatico = {
  codigo : contenidoProgramaticoIdSchema.required(),
  nombre : nombreSchema.required(),
  carrera : carreraIdSchema.required(),
  departamento : departamentoSchema.required(),
  regimen : regimenSchema.required(),
  uc : ucSchema.required(),
  semestre : semestreSchema.required(),
  tipoAsignatura : tipoSchema.required(),

  horasSemanales : horasSemanalesSchema.required(),

  justificacion : justificacionSchema.required(),

  prelacionesRequisito : prelacionRequisitoSchema,
  asignaturasAporte : asignaturaAporteSchema,

  competencias : competenciasSchema.required(),

  unidadTematicaAsignatura : tematicasSchema.required(),

  estrategiaAprendizaje : estrategiaAprendizajeSchema.required(),
  estrategiaEvaluacion : estrategiaEvaluacionSchema.required()
};

const updateContenidoProgramatico = {
  codigo : contenidoProgramaticoIdSchema,
  nombre : nombreSchema,
  carrera : carreraIdSchema,
  departamento : departamentoSchema,
  regimen : regimenSchema,
  uc : ucSchema,
  semestre : semestreSchema,
  tipoAsignatura : tipoSchema,

  horasSemanales : horasSemanalesSchema,

  justificacion : justificacionSchema,

  prelacionesRequisito : prelacionRequisitoSchema,
  asignaturasAporte : asignaturaAporteSchema,

  competencias : competenciasSchema,

  unidadTematicaAsignatura : tematicaSchema,

  EstrategiaAprendizaje : estrategiaAprendizajeSchema,
  EstrategiaEvaluacion : estrategiaEvaluacionSchema
};
  
module.exports = {
  contenidoProgramaticoIdSchema,
  createContenidoProgramatico,
  updateContenidoProgramatico
};