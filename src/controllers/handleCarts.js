const Cart = require("../models/cartsModel");
const addCarts = require("../services/carts/addCarts");
const getCartById = require("../services/carts/getCartById");

const handleGetAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("products.product").lean();

    if (!carts.length) {
      return res.status(404).send("No hay carritos disponibles.");
    }

    // Solo el primer carrito (y unico)
    const cart = carts[0];

    res.status(200).render("pages/carts", {
      products: cart.products,
      cartId: cart._id
    });
  } catch (error) {
    res.status(500).send(`Error interno del servidor: ${error.message}`);
  }
};

const handleAddCart = async (req, res) => {
  try {
    const products = req.body;

    await addCarts(products);

    res.status(200).send(`Carrito agregado correctamente`);
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleAddProductsInCart = async (req, res) => {
  try {
    const { cid: id, pid } = req.params;
    const { quantity } = req.body;

    const cart = await getCartById(id);

    if (!cart) {
      return res.status(404).send("Carrito inexistente");
    }

    const productIndex = cart.products.findIndex(({ product }) =>
      product.equals(pid)
    );

    if (productIndex === -1) {
      cart.products.push({ product: pid, quantity });
    } else {
      cart.products[productIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).send("Carrito modificado correctamente");
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error.message}`);
  }
};

const handleGetCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await getCartById(cid);

    if (cart) {
      res.status(200).json(cart.products);
    } else {
      res.status(404).send("Carrito inexistente");
    }
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleUpdateAllProducts = async (req, res) => {
  try {
    const { cid: id } = req.params;
    const { products } = req.body;

    const cart = await getCartById(id);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado.");
    }

    cart.products = products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    await cart.save();

    res.status(200).send("Carrito modificado correctamente");
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleUpdateProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await getCartById(cid);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    const product = cart.products.find((p) => p.product._id.toString() === pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado en el carrito");
    }

    product.quantity = quantity;

    await cart.save();
    res.status(200).send("Producto del carrito modificado correctamente");
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await getCartById(cid);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    cart.products = cart.products.filter(
      ({ product }) => product._id.toString() !== pid
    );

    await cart.save();

    res.status(200).send("Producto eliminado del carrito correctamente");
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleDeleteAllProducts = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await getCartById(cid);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    cart.products = [];

    await cart.save();

    res.status(200).send("Todos los productos del carrito fueron eliminados");
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

module.exports = {
  handleGetAllCarts,
  handleAddCart,
  handleAddProductsInCart,
  handleGetCart,
  handleUpdateAllProducts,
  handleUpdateProduct,
  handleDeleteProduct,
  handleDeleteAllProducts,
};
