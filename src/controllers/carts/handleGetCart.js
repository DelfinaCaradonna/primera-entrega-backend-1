const getCartById = require("../../services/carts/getCartById");

const handleGetCart = async (req, res) => {
    try {
        const { cid: id } = req.params;
        const cart = await getCartById(id);

        if(cart) {
            res.status(200).json(cart.products);
        } else {
            res.status(404).send("Carrito inexistente");
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
}

module.exports = handleGetCart;