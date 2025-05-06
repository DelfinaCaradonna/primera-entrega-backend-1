const getProducts = require("../../services/products/getProducts");

const handleGetProducts = async (req, res) => {
    try {
     const products = await getProducts();
     res.status(200).json(products);
    } catch (error) {
     res.status(500).send(`Error interno del servidor ${error}`);
    }
 }

 module.exports = handleGetProducts;