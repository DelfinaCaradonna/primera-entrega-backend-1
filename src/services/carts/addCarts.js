const Cart = require("../../models/cartsModel");

const addCarts = async (products) => {
  try {
    const cart = new Cart(products);

    await cart.save();

    return cart;
  } catch (error) {
    console.error("Error al agregar un carrito: ", error);
    throw error;
  }
};

module.exports = addCarts;
