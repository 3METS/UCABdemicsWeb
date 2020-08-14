const joi = require('joi');
const { competenciaIdSchema } = require('./Competencia');
const { carreraIdSchema } = require('./Carrera');

const asignaturaIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const codigoSchema = joi.string().max(5);
const nombreAsignaturaSchema = joi.string().min(10).max(70);
const carreraSchema = joi.array().items(carreraIdSchema).sparse();
const departamentoSchema = joi.string().min(10).max(50);
const regimenSchema = joi.string().min(5).max(20);
const ucSchema = joi.number().integer().min(1);
const semestreSchema = joi
  .string()
  .min(1)
  .max(4)
  .valid('I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X');
const tipoAsignaturaSchema = joi
  .string()
  .min(5)
  .max(20)
  .valid('Obligatoria', 'Electiva');
const horasSchema = joi.number().integer().min(0).default(0);
const horasSemanalesSchema = joi.object({
  teoricas: horasSchema,
  practicaSeminario: horasSchema,
  laboratorio: horasSchema,
});

const asignaturaAporteSchema = joi.array().items(asignaturaIdSchema);
const prelacionRequisitoSchema = joi.array().items(asignaturaIdSchema);
const justificacionSchema = joi.string().min(50).max(500);
const unidadCompetenciaSchema = {
  unidad: joi.number().integer().min(1),
  criterios: joi.array().items(joi.number().integer()),
};
const competenciasSchema = joi.array().items({
  competencia: competenciaIdSchema,
  unidadesCompetencia: joi.array().items(unidadCompetenciaSchema),
});
const temasSchema = {
  tema: joi.number().integer().min(1),
  descripcion: joi.string().min(5).max(70),
  subtemas: joi.array().items(joi.string().min(5).max(200)),
};
const unidadTematicaSchema = joi.array().items(temasSchema);
const estrategiaAprendizajeSchema = joi.string().min(10).max(200);
const estrategiaEvaluacionSchema = joi.string().min(10).max(200);

const createAsignaturaSchema = joi.object({
  codigo: codigoSchema.required(),
  nombreAsignatura: nombreAsignaturaSchema.required(),
  carrera: carreraSchema.required(),
  departamento: departamentoSchema.required(),
  regimen: regimenSchema.required(),
  uc: ucSchema.required(),
  semestre: semestreSchema.required(),
  tipoAsignatura: tipoAsignaturaSchema.required(),
  horasSemanales: horasSemanalesSchema.required(),
  asignaturasAporte: asignaturaAporteSchema,
  prelacionRequisito: prelacionRequisitoSchema,
  justificacion: justificacionSchema.required(),
  competencias: competenciasSchema.required(),
  unidadTematica: unidadTematicaSchema.required(),
  estrategiaAprendizaje: estrategiaAprendizajeSchema.required(),
  estrategiaEvaluacion: estrategiaEvaluacionSchema.required(),
});

const updateAsignaturaSchema = {
  codigo: codigoSchema,
  nombreAsignatura: nombreAsignaturaSchema,
  carrera: carreraSchema,
  departamento: departamentoSchema,
  regimen: regimenSchema,
  uc: ucSchema,
  semestre: semestreSchema,
  tipoAsignatura: tipoAsignaturaSchema,
  horasSemanales: horasSemanalesSchema,
  asignaturasAporte: asignaturaAporteSchema,
  prelacionRequisito: prelacionRequisitoSchema,
  justificacion: justificacionSchema,
  competencias: competenciasSchema,
  unidadTematica: unidadTematicaSchema,
  estrategiaAprendizaje: estrategiaAprendizajeSchema,
  estrategiaEvaluacion: estrategiaEvaluacionSchema,
};

module.exports = {
  asignaturaIdSchema,
  createAsignaturaSchema,
  updateAsignaturaSchema,
};
