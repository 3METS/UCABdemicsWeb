const app = require('express')();
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { config } = require('./config/index');

const mailApi = require('./routes/mail');
const docManagerApi = require('./routes/docManager');

//AUTH API
const authApi = require('./routes/auth');

//DB APIS
const asignaturaApi = require('./routes/Asignatura');
const competenciaApi = require('./routes/competencia');
const carreraApi = require('./routes/carrera');
const periodoApi = require('./routes/periodoAcademico');
const profesorApi = require('./routes/Profesor');
const planDeClaseApi = require('./routes/PlanDeClase');
const solicitudApi = require('./routes/Solicitud');
const seccionApi = require('./routes/Seccion');

const {
  logErrors,
  errorHandler,
  wrapError,
} = require('./utils/middlewares/errorHandlers');

const { notFoundHandler } = require('./utils/middlewares/notFoundHandler');

//Express settings
app.use(require('express').json());
app.use(require('cors')());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

//Routes
mailApi(app);
docManagerApi(app);
asignaturaApi(app);
competenciaApi(app);
carreraApi(app);
periodoApi(app);
profesorApi(app);
seccionApi(app);
planDeClaseApi(app);
solicitudApi(app);
authApi(app);

//Direcciona a 404 not found
app.use(notFoundHandler);

//Manejadores de Error
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
