const fs = require("fs").promises;
const path = require("path");

const CARTS_FILE = path.join(__dirname, '../../db/carts.json')

const getCarts = async () => {
    try {
        const data = await fs.readFile(CARTS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al intentar ver los carritos: ", error);
        return [];
    }
};

module.exports = getCarts;