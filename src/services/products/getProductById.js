const Product = require("../../models/productsModel");

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);

    return product;
  } catch (error) {
    console.error("Error al intentar ver el producto solicitado: ", error);
    return [];
  }
};

module.exports = getProductById;
