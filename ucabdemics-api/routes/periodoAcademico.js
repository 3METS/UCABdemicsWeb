const apiService = require('../services/PeriodoAcademico').PeriodoService;

const createPeriodoAcademico = require('../models/periodoAcademico').createPeriodoAcademico;
const updatePeriodoAcademico = require('../models/periodoAcademico').updatePeriodoAcademico;

const { validationHandler } = require('../utils/middlewares/validationHandlers');



function periodoAcademicoRoute(app){

    this.periodoService = new apiService();
    var params;
     
    app.get('/buscarTodos',validationHandler(updatePeriodoAcademico), async function(req,res){
        const body = req.body;
        try {
            const data = await this.periodoService.buscarTodos(body);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/buscarPrimero',validationHandler(updatePeriodoAcademico), async function(req,res){
        const body = req.body;
        try {
            const data = await this.periodoService.buscarPrimero(body);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
    });
    
    app.post('/crear',validationHandler(createPeriodoAcademico), async function(req,res){
        const {body : periodo} = req;
        try {
            const data = await this.periodoService.crear(periodo);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/modificar',validationHandler(updatePeriodoAcademico), async function(req,res){
        const body = req.body;
        params = body;
        const data = await this.periodoService.buscarUno(body);
        params = data;
        res.json({
            data:data
        })
    });

    app.post('/modificar',validationHandler(updatePeriodoAcademico), async function(req,res){
        const body = req.body;
        const data = await this.periodoService.modificar(params,body);
        res.json({
            data:data
        })
    });

    app.delete('/eliminar', validationHandler(updatePeriodoAcademico),async function(req,res){
        const body = req.body;
        const data = await this.periodoService.eliminar(body);
        res.json({
            data:data
        })
    });


}
module.exports = periodoAcademicoRoute;