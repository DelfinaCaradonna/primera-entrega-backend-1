const Cart = require("../../models/cartsModel");

const getCarts = async () => {
  try {
    const cartsFromDb = await Cart.find({}, "_id products");

    const carts = cartsFromDb.map((cart) => ({
      ...cart.toObject(),
      id: cart._id.toString(),
    }));

    return carts;
  } catch (error) {
    console.error("Error al intentar ver los carritos: ", error);
    return [];
  }
};

module.exports = getCarts;
