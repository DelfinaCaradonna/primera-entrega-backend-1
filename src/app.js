const express = require("express");
const app = express();

const productsRoutes = require("./routes/products");
const cartsRoutes = require("./routes/carts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

module.exports = app;
