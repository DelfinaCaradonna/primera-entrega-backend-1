const path = require("path");
const fs = require("fs").promises;

const PRODUCTS_FILE = path.join(__dirname, "../../db/products.json");

const addProducts = async (products) => {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error("Error al agregar un producto: ", error);
    throw error;
  }
};

module.exports = addProducts;
