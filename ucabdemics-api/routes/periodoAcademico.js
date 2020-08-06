const apiService = require('../services/PeriodoAcademico').PeriodoService;

const createPeriodoAcademico = require('../models/periodoAcademico').createPeriodoAcademico;
const updatePeriodoAcademico = require('../models/periodoAcademico').updatePeriodoAcademico;

const { validationHandler } = require('../utils/middlewares/validationHandlers');



function periodoAcademicoRoute(app){

    this.periodoService = new apiService();
    var params;
     
    app.get('/buscarVarios/periodoAcademico',validationHandler(updatePeriodoAcademico), async function(req,res){
        const body = req.body;
        try {
            const data = await this.periodoService.buscarVarios(body);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/buscarPrimero/periodoAcademico',validationHandler(updatePeriodoAcademico), async function(req,res){
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
    
    app.post('/crear/periodoAcademico',validationHandler(createPeriodoAcademico), async function(req,res){
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

    app.get('/modificar/periodoAcademico',validationHandler(updatePeriodoAcademico), async function(req,res){
        const body = req.body;
        const data = await this.periodoService.buscarPrimero(body);
        params = data;
        res.json({
            data:data
        })
    });

    app.post('/modificar/periodoAcademico',validationHandler(updatePeriodoAcademico), async function(req,res){
        const body = req.body;
        const data = await this.periodoService.modificar(params,body);
        res.json({
            data:data
        })
    });

    app.delete('/eliminar/periodoAcademico', validationHandler(updatePeriodoAcademico),async function(req,res){
        const body = req.body;
        const data = await this.periodoService.eliminar(body);
        res.json({
            data:data
        })
    });


}
module.exports = periodoAcademicoRoute;