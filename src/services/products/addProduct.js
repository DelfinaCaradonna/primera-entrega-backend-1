const Product = require("../../models/productsModel");

const addProduct = async (newProduct) => {
  try {
    const product = new Product(newProduct);

    await product.save();

    return product;
  } catch (error) {
    console.error("Error al modificar un producto: ", error);
    throw error;
  }
};

module.exports = addProduct;
