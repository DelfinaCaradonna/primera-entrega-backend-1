const express = require("express");

const handleAddCart = require("../controllers/carts/handleAddCart");
const handleGetCart = require("../controllers/carts/handleGetCart");
const handleAddProductsInCart = require("../controllers/carts/handleAddProductsInCart");

const router = express.Router();

router.post("/", handleAddCart);
router.get("/:cid", handleGetCart);
router.post("/:cid/product/:pid", handleAddProductsInCart);

module.exports = router;
