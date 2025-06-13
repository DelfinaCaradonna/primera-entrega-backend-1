const express = require("express");

const {
  handleGetAllCarts,
  handleAddCart,
  handleGetCart,
  handleAddProductsInCart,
  handleUpdateAllProducts,
  handleUpdateProduct,
  handleDeleteProduct,
  handleDeleteAllProducts,
} = require("../controllers/handleCarts");

const router = express.Router();

router.get("/", handleGetAllCarts);
router.post("/", handleAddCart);
router.get("/:cid", handleGetCart);
router.post("/:cid/product/:pid", handleAddProductsInCart);
router.put("/:cid", handleUpdateAllProducts);
router.put("/:cid/products/:pid", handleUpdateProduct);
router.delete("/:cid/products/:pid", handleDeleteProduct);
router.delete("/:cid", handleDeleteAllProducts);

module.exports = router;
