const joi = require('joi');
const { asignaturaIdSchema } = require('./asignatura');
const { competenciaIdSchema } = require('./competencia');
const { periodoAcademicoIdSchema } = require('./periodoAcademico');

const planClaseIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const escuelaSchema = joi.string().min(10).max(100);
const seccionSchema = joi.string().min(3).max(3);
const periodoSchema = periodoAcademicoIdSchema;
const asignaturaSchema = joi.string().min(10).max(70);
const profesorSchema = joi.string().min(5).max(30);
const competenciasSchema = joi.array().items(competenciaIdSchema);

const subtemaItemSchema = {
  subtema: joi.string().regex(/^[0-9]{2}-[0-9]{2}$/),
  progreso: joi.number().integer().min(0).max(100).default(0),
};
const unidadTematicaItemSchema = {
  temas: joi.array().items(joi.number().integer().min(1)),
  subtemas: joi.array().items(subtemaItemSchema).min(1),
};
const evaluacionFechayPonderacionShema = {
  tipo: joi.string().min(5).max(50),
  tecnica: joi.string().min(10).max(50),
  instrumento: joi.string().min(10).max(50),
  evidencia: joi.string().min(10).max(70),
  fecha: joi.array().items(joi.string().regex(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/)),
  ponderacion: joi.number().integer(),
};
const contenidoItemSchema = {
  fechaSemana: joi
    .array()
    .items(joi.string().regex(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/)),
  unidadesCompetencia: joi
    .array()
    .items(joi.string().regex(/^[0-9A-Z]{6}-[0-9]{2}$/)),
  criterios: joi
    .array()
    .items(joi.string().regex(/^[0-9A-Z]{6}-[0-9]{2}-[0-9]{2}$/)),
  unidadTematica: joi.array().items(unidadTematicaItemSchema),
  actividadesDocente: joi.array().items(joi.string().min(10).max(200)),
  actividadesEstudiante: joi.array().items(joi.string().min(10).max(200)),
  evaluaciones: joi.array().items(evaluacionFechayPonderacionShema),
};

const evaluacionItemSchema = {
  evidencia: joi.string().min(5).max(70),
  fecha: joi.array().items(joi.string().regex(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/)),
  temas: joi.array().items(joi.string().regex(/^[0-9]{2}-[0-9]{2}$/)),
};

const evaluacionSchema = joi.array().items(evaluacionItemSchema);
const contenidosSchema = joi.array().items(contenidoItemSchema);

const createPlanClaseSchema = joi.object({
  escuela: escuelaSchema.required(),
  contenidoProgramatico: asignaturaIdSchema.required(),
  seccion: seccionSchema.required(),
  periodo: periodoSchema.required(),
  asignatura: asignaturaSchema.required(),
  profesor: profesorSchema.required(),
  competencias: competenciasSchema.required(),
  contenidos: contenidosSchema.required(),
  evaluaciones: evaluacionSchema.required(),
});

const updatePlanClaseSchema = joi.object({
  escuela: escuelaSchema,
  contenidoProgramatico: asignaturaIdSchema,
  seccion: seccionSchema,
  periodo: periodoSchema,
  asignatura: asignaturaSchema,
  profesor: profesorSchema,
  competencias: competenciasSchema,
  contenidos: contenidosSchema,
  evaluaciones: evaluacionSchema,
});

module.exports = {
  planClaseIdSchema,
  createPlanClaseSchema,
  updatePlanClaseSchema,
};
