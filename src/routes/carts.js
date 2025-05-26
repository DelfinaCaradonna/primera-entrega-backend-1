const express = require("express");

const {
  handleAddCart,
  handleGetCart,
  handleAddProductsInCart,
} = require("../controllers/handleCarts");

const router = express.Router();

router.post("/", handleAddCart);
router.get("/:cid", handleGetCart);
router.post("/:cid/product/:pid", handleAddProductsInCart);

module.exports = router;
