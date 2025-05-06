const { isEqual } = require("lodash");

const getCarts = require("../../services/carts/getCarts");
const addCarts = require("../../services/carts/addCarts");

const handleAddProductsInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        
        const carts = await getCarts();

        const cartIndex = carts.findIndex((cart) => isEqual(cart.id, parseInt(cid)));

        if (cartIndex === -1) {
            res.status(404).send("Carrito inexistente")
        };
        
        const products = carts[cartIndex].products;
        
        const productIndex = products.findIndex(({product}) => isEqual(product, pid));
        
        if (productIndex === -1) {
            products.push({ product: pid, quantity });
        } else {
            products[productIndex].quantity += quantity;
        }
        
        await addCarts(carts);
        res.status(200).send("Carrito modificado correctamente");
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error.message}`);
    }
};

module.exports = handleAddProductsInCart;
