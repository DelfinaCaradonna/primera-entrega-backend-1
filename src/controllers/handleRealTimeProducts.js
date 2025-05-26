const getProducts = require("../services/products/getProducts");

const handleGetRealTimeProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).render("pages/realTimeProducts", { products });
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

module.exports = handleGetRealTimeProducts;
