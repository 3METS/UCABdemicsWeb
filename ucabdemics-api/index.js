const app = require('express')();
const bodyParser = require('body-parser');
const { config } = require('./config/index');

const {
  logErrors,
  errorHandler,
  wrapError,
} = require('./utils/middlewares/errorHandlers');

const { notFoundHandler } = require('./utils/middlewares/notFoundHandler');

app.use(require('express').json());
app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Direcciona a 404 not found
app.use(notFoundHandler);

//Manejadores de Error
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
