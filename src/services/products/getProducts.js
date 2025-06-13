const Product = require("../../models/productsModel");

const getProducts = async () => {
  try {
    const productsFromDb = await Product.find(
      {},
      "_id title description code price status stock category thumbnails"
    );

    const products = productsFromDb.map((prod) => ({
      ...prod.toObject(),
      id: prod._id.toString(),
    }));

    return products;
  } catch (error) {
    console.error("Error al intentar ver los productos: ", error);
    return [];
  }
};

module.exports = getProducts;
