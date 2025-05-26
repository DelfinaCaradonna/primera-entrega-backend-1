const { isEqual, random } = require("lodash");

const addCarts = require("../services/carts/addCarts");
const getCarts = require("../services/carts/getCarts");
const getCartById = require("../services/carts/getCartById");

const handleAddCart = async (req, res) => {
  try {
    const products = req.body;

    const id = random(1000);

    const carts = await getCarts();

    const newCart = {
      id,
      products,
    };

    carts.push(newCart);

    await addCarts(carts);

    res.status(200).send(`Carrito agregado correctamente`);
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleAddProductsInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const carts = await getCarts();

    const cartIndex = carts.findIndex((cart) =>
      isEqual(cart.id, parseInt(cid))
    );

    if (cartIndex === -1) {
      res.status(404).send("Carrito inexistente");
    }

    const products = carts[cartIndex].products;

    const productIndex = products.findIndex(({ product }) =>
      isEqual(product, pid)
    );

    if (productIndex === -1) {
      products.push({ product: pid, quantity });
    } else {
      products[productIndex].quantity += quantity;
    }

    await addCarts(carts);
    res.status(200).send("Carrito modificado correctamente");
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error.message}`);
  }
};

const handleGetCart = async (req, res) => {
  try {
    const { cid: id } = req.params;
    const cart = await getCartById(id);

    if (cart) {
      res.status(200).json(cart.products);
    } else {
      res.status(404).send("Carrito inexistente");
    }
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

module.exports = { handleAddCart, handleAddProductsInCart, handleGetCart };
