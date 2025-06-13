const express = require("express");
const routes = require("./routes");
const path = require("path");
require("dotenv").config();

const setupHandlebars = require("./config/handlebars");
const setupMongoose = require("./config/mongoose");

const app = express();
const MONGO_URI = process.env.MONGO_URI;

setupMongoose(MONGO_URI);
setupHandlebars(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

module.exports = app;
