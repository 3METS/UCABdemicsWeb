const app = require("express")();

app.use(require("express").json());
app.use(require("cors")());

app.listen();
