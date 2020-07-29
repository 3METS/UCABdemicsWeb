const joi = require('@hapi/joi');

const planClaseIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

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
    ponderacion : joi.number().min(0),
    fecha : joi.string().max(50),
    tipo : joi.string().max(300),
    instrumento : joi.string().max(300),
    tecnica : joi.string().max(300),
    temas : joi.array().items(unidadTematica.codigo)
};

const contenidoSchema = {
    codigo : joi.number().integer().min(0),
    fechaSemana : joi.string().max(50),
    actividadesDocente : joi.array().items(),
    actividadesEstudiante : joi.array().items(),
    unidadesTematicas : joi.array().items(unidadTematica),
    evaluaciones : joi.array().items(evaluacionSchema)
};

const contenidosSchema = joi.array().items(contenidoSchema);
// **********************************************

const createPlanClase ={
    escuela : escuelaSchema.required(),
    contenidos : contenidosSchema.required()
};

const updatePlanClase = {
    escuela : escuelaSchema,
    contenidos : contenidosSchema
  };
  
  module.exports = {
    planClaseIdSchema,
    createPlanClase,
    updatePlanClase
  };