const express = require("express");
const router = express.Router();

const productsRouter = require("./products");
const cartsRouter = require("./carts");
const realTimeProductsRouter = require("./realTimeProducts");

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/realTimeProducts", realTimeProductsRouter);

module.exports = router;
