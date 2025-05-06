const { random } = require("lodash");

const addCarts = require("../../services/carts/addCarts");
const getCarts = require("../../services/carts/getCarts");

const handleAddCart = async (req, res) => {
    try {
        const products = req.body;

        const id = random(1000);

        const carts = await getCarts();

        const newCart = {
            id,
            products
        }

        carts.push(newCart);

        await addCarts(carts);

        res.status(200).send(`Carrito agregado correctamente`);
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
}

module.exports = handleAddCart;