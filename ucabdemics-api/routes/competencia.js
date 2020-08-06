const apiService = require('../services/Competencia').CompetenciaService;

const createCompetencia = require('../models/competencia').createCompetencia;
const updateCompetencia = require('../models/competencia').updateCompetencia;

const { validationHandler } = require('../utils/middlewares/validationHandlers');



function competenciaRoute(app){

    this.competenciaService = new apiService();
     
    app.get('/buscarVarios/competencia',validationHandler(updateCompetencia), async function(req,res){
        const body = req.body;
        try {
            const data = await this.competenciaService.buscarVarios(body);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/buscarUnidades/competencia',validationHandler(updateCompetencia), async function(req,res){
        const body = req.body;
        try {
            const competencia = await this.competenciaService.buscar(body);
            const data = await this.competenciaService.buscarUnidades(competencia);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
    });
    
    app.post('/crear/competencia',validationHandler(createCompetencia), async function(req,res){
        const {body : periodo} = req;
        try {
            const data = await this.competenciaService.crear(periodo);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/modificar/competencia',validationHandler(updateCompetencia), async function(req,res){
        const body = req.body;
        const data = await this.competenciaService.buscarPrimero(body);
        params = data;
        res.json({
            data:data
        })
    });

    app.post('/modificar/competencia',validationHandler(updateCompetencia), async function(req,res){
        const body = req.body;
        const data = await this.competenciaService.modificar(params,body);
        res.json({
            data:data
        })
    });

    app.delete('/eliminar/competencia', validationHandler(updateCompetencia),async function(req,res){
        const body = req.body;
        const data = await this.competenciaService.eliminar(body);
        res.json({
            data:data
        })
    });


}
module.exports = competenciaRoute;