const express = require("express");
const routes = require("./routes");
const path = require("path");

const setupHandlebars = require("./config/handlebars");

const app = express();

setupHandlebars(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

module.exports = app;
