const Product = require("../../models/productsModel");

const deleteProduct = async (id) => {
    try {
        await Product.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error al eliminar un producto: ", error);
        throw error;
    }
}

module.exports = deleteProduct;