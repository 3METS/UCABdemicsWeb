const joi = require('@hapi/joi');


const carreraIdSchema = require('./carrera').carreraIdSchema;
const competenciaIdSchema = require('./competencia').competenciaIdSchema;

const asignaturaIdSchema = joi.string().max(30);

// const codigoSchema = joi.string().max(20);
const nombreSchema = joi.string().max(100);
const departamentoSchema = joi.string().max(100);
const regimenSchema = joi.string().max(100);
const ucSchema = joi.number().integer().min(1);
const semestreSchema = joi.string().max(30);
const tipoSchema = joi.string().max(100);
// ****************************************
const horasSemanalesSchema = {
  teoricas: joi.number().integer().min(0).default(0),
  practicaSeminario: joi.number().integer().min(0).default(0),
  laboratorio: joi.number().integer().min(0).default(0),
};
// ****************************************
const competenciasSchema = joi.array().items(competenciaIdSchema);
// ****************************************
const subtemaSchema = joi.string().max(300);

const tematicaSchema = {
  tema : joi.number().integer().min(1),
  descripcion : joi.string().max(300),
  subtemas : joi.array().items(subtemaSchema)
};
// *****************************************
const estrategiaAprendizajeSchema = joi.string().max(300);
const estrategiaEvaluacionSchema = joi.string().max(300);

const prelacionRequisitoSchema = asignaturaIdSchema;
const asignaturaAporteSchema = asignaturaIdSchema;

const createAsignatura = {
  codigo : asignaturaIdSchema.required(),
  nombre : nombreSchema.required(),
  carrera : carreraIdSchema.required(),
  departamento : departamentoSchema.required(),
  regimen : regimenSchema.required(),
  uc : ucSchema.required(),
  semestre : semestreSchema.required(),
  tipoAsignatura : tipoSchema.required(),

  horasSemanales : horasSemanalesSchema.required(),

  prelacionRequisito : prelacionRequisitoSchema,
  asignaturaAporte : asignaturaAporteSchema,

  competencias : competenciasSchema.required(),

  unidadTematicaAsignatura : tematicaSchema.required(),

  EstrategiaAprendizaje : estrategiaAprendizajeSchema.required(),
  EstrategiaEvaluacion : estrategiaEvaluacionSchema.required()
};

const updateAsignatura = {
  codigo : asignaturaIdSchema,
  nombre : nombreSchema,
  carrera : carreraIdSchema,
  departamento : departamentoSchema,
  regimen : regimenSchema,
  uc : ucSchema,
  semestre : semestreSchema,
  tipoAsignatura : tipoSchema,

  horasSemanales : horasSemanalesSchema,

  prelacionRequisito : prelacionRequisitoSchema,
  asignaturaAporte : asignaturaAporteSchema,

  competencias : competenciasSchema,

  unidadTematicaAsignatura : tematicaSchema,

  EstrategiaAprendizaje : estrategiaAprendizajeSchema,
  EstrategiaEvaluacion : estrategiaEvaluacionSchema
};
  
module.exports = {
  asignaturaIdSchema,
  createAsignatura,
  updateAsignatura
};