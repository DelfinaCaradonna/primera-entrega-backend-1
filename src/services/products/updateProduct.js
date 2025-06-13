const Product = require("../../models/productsModel");

const updateProduct = async (id, req) => {
  try {
    await Product.findByIdAndUpdate(id.toString(), req.body, {
      new: true,
    });
  } catch (error) {
    console.error("Error al modificar un producto: ", error);
    throw error;
  }
};

module.exports = updateProduct;
