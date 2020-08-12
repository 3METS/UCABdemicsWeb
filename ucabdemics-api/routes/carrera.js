const apiService = require('../services/Carrera').CarreraService;

const createCarrera = require('../models/carrera').createCarrera;
const updateCarrera = require('../models/carrera').updateCarrera;

const { validationHandler } = require('../utils/middlewares/validationHandlers');



function carreraRoute(app){

    this.carreraService = new apiService();

    app.post('/crear/carrera',validationHandler(createCarrera), async function(req,res){
        const {body : carrera} = req;
        console.log(carrera);
        try {
            const data = await this.carreraService.crear(carrera);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });

     
    app.get('/buscarAsignaturas/carrera',validationHandler(updateCarrera), async function(req,res){
        const body = req.body;
        try {
            const data = await this.periodoService.buscarAsignaturas(body);
            res.json({
                data:data
            })
        } catch (error) {
            console.log(error);
        }
        
    });


    

}
module.exports = carreraRoute;