const { isEqual, random } = require("lodash");

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

const handleAddProduct = async (req, res) => {
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

        const id = random(1000);
        
        const missingFields = ALLOWED_FIELDS.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).send(`Faltan datos: ${missingFields.join(", ")}`);
        }

        const products = await getProducts();
        const existingProduct = products.find((product) => isEqual(product.id, parseInt(id)));

        if(existingProduct){
            return res.status(400).send("Producto con ID ya existente");
        }
        
        const newProduct = {
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        products.push(newProduct);

        await addProducts(products);

        res.status(200).send(`Producto agregado correctamente`);
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
}

module.exports = handleAddProduct;