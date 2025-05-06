const express = require("express");

const handleGetProducts = require("../controllers/products/handleGetProducts");
const handleGetProduct = require("../controllers/products/handleGetProduct");
const handleAddProduct = require("../controllers/products/handleAddProduct");
const handleDeleteProduct = require("../controllers/products/handleDeleteProduct");
const handleModifyProduct = require("../controllers/products/handleModifyProduct");

const router = express.Router();

router.get("/", handleGetProducts);
router.get("/:pid", handleGetProduct);
router.post("/", handleAddProduct);
router.delete("/delete-product", handleDeleteProduct);
router.put("/:pid", handleModifyProduct);

module.exports = router;
