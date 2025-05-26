const fs = require("fs").promises;
const path = require("path");

const PRODUCTS_FILE = path.join(__dirname, "../../db/products.json");

const getProducts = async () => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al intentar ver los productos: ", error);
    return [];
  }
};

module.exports = getProducts;
