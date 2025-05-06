const fs = require("fs").promises;
const { isEqual } = require("lodash");
const path = require("path");

const getProductById = require("./getProductById");
const getProducts = require("./getProducts");

const PRODUCTS_FILE = path.join(__dirname, '../../db/products.json')

const deleteProduct = async (id) => {
    try {
        const products = await getProducts();
        const productToDelete = await getProductById(id);

        const newProducts = products.filter((product) => !isEqual(product, productToDelete));

        await fs.writeFile(PRODUCTS_FILE, JSON.stringify(newProducts, null, 2));
    } catch (error) {
        console.error("Error al eliminar un producto: ", error);
        throw error;
    }
}

module.exports = deleteProduct;