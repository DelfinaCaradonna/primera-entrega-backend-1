const express = require("express");
const router = express.Router();

const handleGetRealTimeProducts = require("../controllers/handleRealTimeProducts");

router.get("/", handleGetRealTimeProducts);

module.exports = router;
