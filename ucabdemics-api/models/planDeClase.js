const joi = require('@hapi/joi');

const planClaseIdSchema =  joi.string().max(30);
const contenidoIdSchema =  joi.string().max(30);

const escuelaSchema = joi.string().max(100);
// **********************************************
const actividadDocente = joi.string().max(300);
const actividadEstudiante = joi.string().max(300);

const unidadTematica = {
    codigo : joi.number().integer().min(0),
    tema :joi.string().max(300),
    subtema : joi.string().max(300),
    porcentajeProgreso : joi.number().min(0)
};

const evaluacionSchema = {
    codigo : joi.number().integer().min(0),
    nombre : joi.string().max(300),
    status : joi.boolean().default(false), //Para saber si está pendiente o ya se realizó false=pendiente
    ponderacion : joi.number().min(0),
    fecha : joi.string().max(50),
    tipo : joi.string().max(300),
    instrumento : joi.string().max(300),
    tecnica : joi.string().max(300),
    temas : joi.array().items(unidadTematica.tema)
};

const contenidoSchema = {
    codigo : contenidoIdSchema,
    fechaSemana : joi.string().max(50),
    actividadesDocente : joi.array().items(actividadDocente),
    actividadesEstudiante : joi.array().items(actividadEstudiante),
    unidadesTematicas : joi.array().items(unidadTematica),
    evaluaciones : joi.array().items(evaluacionSchema)
};

const contenidosSchema = joi.array().items(contenidoSchema);
// **********************************************

const createPlanClase ={
    codigo : planClaseIdSchema.required(),
    escuela : escuelaSchema.required(),
    contenidos : contenidosSchema.required()
};

const updatePlanClase = {
    codigo : planClaseIdSchema,
    escuela : escuelaSchema,
    contenidos : contenidosSchema
  };
  
  module.exports = {
    planClaseIdSchema,
    contenidoIdSchema,
    createPlanClase,
    updatePlanClase
  };