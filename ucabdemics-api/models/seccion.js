const joi = require('@hapi/joi');

const seccionIdSchema = joi.string().max(20);

const asignaturaIdSchema = require('./asignatura').asignaturaIdSchema;
const profesorIdSchema = require('./profesor').profesorIdSchema;
const periodoAcademicoIdSchema = require('./periodoAcademico').periodoAcademicoIdSchema;
const planClaseIdSchema = require('./planDeClase').planClaseIdSchema;
const contenidosSchema = require('./planDeClase').createPlanClase.contenidos;

const horarioSchema = {
    horaInicio : joi.string().max(10),
    duracion : joi.number().integer().min(1).max(6),
    dia : joi.string().max(10),
    aula : joi.string().max(10)
}

const horariosSchema = joi.array().items(horarioSchema);

const createSeccion = {
    nrc : seccionIdSchema.required(),
    asignatura : asignaturaIdSchema.required(),
    profesor : profesorIdSchema.required(),
    horarios : horariosSchema.required(),
    periodoAcademico : periodoAcademicoIdSchema.required(),
    planDeClase : planClaseIdSchema.required(),
    seguimiento : contenidosSchema.required()
};

const updateSeccion = {
    nrc : seccionIdSchema,
    asignatura : asignaturaIdSchema,
    profesor : profesorIdSchema,
    horarios : horariosSchema,
    periodoAcademico : periodoAcademicoIdSchema,
    planDeClase : planClaseIdSchema,
    seguimiento : contenidosSchema
};

module.exports = {
    seccionIdSchema,
    createSeccion,
    updateSeccion
}




