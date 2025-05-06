const { isEqual } = require("lodash");

const getProducts = require("../../services/products/getProducts");
const deleteProduct = require("../../services/products/deleteProduct");

const handleDeleteProduct = async (req, res) => {
    try {
        const { id } = req.query;
        const products = await getProducts();
        const existingProduct = products.find((product) => isEqual(product.id, parseInt(id)));

        if(existingProduct){
            await deleteProduct(id);

            res.status(200).send("Producto eliminado correctamente");
        } else {
            res.status(404).send("Producto inexistente");
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
}

module.exports = handleDeleteProduct;