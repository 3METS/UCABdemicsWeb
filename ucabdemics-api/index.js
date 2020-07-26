const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { config } = require('./config/index');

const mailApi = require('./routes/mail');

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

//Direcciona a 404 not found
app.use(notFoundHandler);

//Manejadores de Error
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
