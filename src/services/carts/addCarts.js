const path = require("path");
const fs = require("fs").promises;

const CARTS_FILE = path.join(__dirname, '../../db/carts.json')

const addCarts = async (carts) => {
    try {
        await fs.writeFile(CARTS_FILE, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error("Error al agregar un carrito: ", error);
        throw error;
    }
}

module.exports = addCarts;