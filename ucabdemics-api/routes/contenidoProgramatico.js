const apiService = require('../services/contenidoProgramatico').ContenidoProgramaticoService;

const createContenidoProgramatico = require('../models/contenidoProgramatico').createContenidoProgramatico;
const updateContenidoProgramatico = require('../models/contenidoProgramatico').updateContenidoProgramatico;

const { validationHandler } = require('../utils/middlewares/validationHandlers');



function contenidoProgramaticoRoute(app){

    this.contenidoService = new apiService();

    app.post('/crear/contenidoProgramatico',validationHandler(createContenidoProgramatico), async function(req,res){
        const {body : contenido} = req;
        try {
            const data = await this.contenidoService.crear(contenido);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/buscarCompetencias/contenidoProgramatico',validationHandler(updateContenidoProgramatico), async function(req,res){
        const body = req.body;
        try {
            const asignatura = await this.contenidoService.buscarAsignatura(body);
            // console.log(asignatura);
            const data = await this.contenidoService.buscarCompetencias(asignatura);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/buscarHoras/contenidoProgramatico',validationHandler(updateContenidoProgramatico), async function(req,res){
        const body = req.body;
        try {
            const asignatura = await this.contenidoService.buscarAsignatura(body);
            // console.log(asignatura);
            const data = await this.contenidoService.buscarHoras(asignatura);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

    app.get('/buscarAsignaturas/contenidoProgramatico',validationHandler(updateContenidoProgramatico), async function(req,res){
        const body = req.body;
        try {
            const data = await this.contenidoService.buscarAsignaturas(body);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

}
module.exports = contenidoProgramaticoRoute;