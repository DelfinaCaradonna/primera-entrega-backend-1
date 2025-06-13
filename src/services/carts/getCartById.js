const Cart = require("../../models/cartsModel");

const getCartById = async (id) => {
  try {
    const cart = await Cart.findById(id).populate("products.product");

    return cart;
  } catch (error) {
    console.error(
      "Error al intentar ver los productos del carrito solicitado: ",
      error
    );
    return [];
  }
};

module.exports = getCartById;
