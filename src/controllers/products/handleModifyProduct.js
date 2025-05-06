const { isEqual } = require("lodash");

const getProducts = require("../../services/products/getProducts");
const addProducts = require("../../services/products/addProducts");

const ALLOWED_FIELDS = [
    "title",
    "description",
    "code",
    "price",
    "status",
    "stock",
    "category",
    "thumbnails"
];

const handleModifyProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        } = req.body;
        const { pid: id } = req.params;

        const bodyKeys = Object.keys(req.body);
        const invalidKeys = bodyKeys.filter(key => !ALLOWED_FIELDS.includes(key));

        if (invalidKeys.length > 0) {
            return res.status(400).json(`Los parámetros ingresados no son válidos: ${invalidKeys}`);
        }

        const products = await getProducts();
        const existingProduct = products.find((product) => isEqual(product.id, parseInt(id)));

        if(!existingProduct){
            return res.status(404).send("Producto inexistente");
        }

        const index = products.findIndex((product) => isEqual(product.id, parseInt(id)));

        products[index] = {
            ...products[index],
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        await addProducts(products); 

        res.status(200).json("Producto editado correctamente");

    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
}

module.exports = handleModifyProduct;
