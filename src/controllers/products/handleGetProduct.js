const getProductById = require("../../services/products/getProductById");

const handleGetProduct = async (req, res) => {
    try {
        const { pid: id } = req.params;
        const product = await getProductById(id);

        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).send("Producto inexistente");
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
}

module.exports = handleGetProduct;