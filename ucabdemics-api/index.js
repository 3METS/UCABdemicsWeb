const app = require('express')();
const bodyParser = require("body-parser")
const { config } = require('./config/index');
const api = require('./routes/server')

app.use(require('express').json());
app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//api(app);

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
