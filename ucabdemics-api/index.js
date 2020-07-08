const app = require('express')();
const { config } = require('./config/index');

app.use(require('express').json());
app.use(require('cors')());

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
