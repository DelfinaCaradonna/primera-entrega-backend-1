const express = require("express");
const router = express.Router();

const {
  handleGetProducts,
  handleGetProduct,
  handleAddProduct,
  handleDeleteProduct,
  handleModifyProduct,
} = require("../controllers/handleProducts");

router.get("/", handleGetProducts);
router.get("/:pid", handleGetProduct);
router.post("/", handleAddProduct);
router.delete("/delete-product", handleDeleteProduct);
router.put("/:pid", handleModifyProduct);

module.exports = router;
