const { isEqual } = require("lodash");

const getCarts = require("./getCarts");

const getCartById = async (id) => {
    try {
        const data = await getCarts();
        const cart = data.find((cart) => isEqual(cart.id, parseInt(id)));

        return cart;
    } catch (error) {
        console.error("Error al intentar ver los productos del carrito solicitado: ", error);
        return [];
    }
};

module.exports = getCartById;