const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { config } = require('./config/index');

const mailApi = require('./routes/mail');

const periodoApi = require('./routes/periodoAcademico');
const competenciaApi = require('./routes/competencia');
const carreraApi = require('./routes/carrera');
const contenidoProgramaticoApi = require('./routes/contenidoProgramatico');

const {
  logErrors,
  errorHandler,
  wrapError,
} = require('./utils/middlewares/errorHandlers');

const { notFoundHandler } = require('./utils/middlewares/notFoundHandler');

app.use(require('express').json());
app.use(require('cors')());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
mailApi(app);
periodoApi(app);
competenciaApi(app);
carreraApi(app);
contenidoProgramaticoApi(app);

//Direcciona a 404 not found
app.use(notFoundHandler);

//Manejadores de Error
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
