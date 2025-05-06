const { isEqual } = require("lodash");

const getProducts = require("./getProducts");

const getProductById = async (id) => {
    try {
        const data = await getProducts();
        const product = data.find((product) => isEqual(product.id, parseInt(id)));

        return product;
    } catch (error) {
        console.error("Error al intentar ver el producto solicitado: ", error);
        return [];
    }
};

module.exports = getProductById;