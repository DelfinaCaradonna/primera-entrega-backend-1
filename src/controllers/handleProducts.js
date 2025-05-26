const { isEqual, random } = require("lodash");

const setupAndGetWebSocket = require("../config/websocket");
const getProducts = require("../services/products/getProducts");
const getProductById = require("../services/products/getProductById");
const addProducts = require("../services/products/addProducts");
const deleteProduct = require("../services/products/deleteProduct");

const ALLOWED_FIELDS = [
  "title",
  "description",
  "code",
  "price",
  "status",
  "stock",
  "category",
  "thumbnails",
];

const handleAddProduct = async (req, res) => {
  try {
    const io = setupAndGetWebSocket();
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    const id = random(1000);

    const missingFields = ALLOWED_FIELDS.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send(`Faltan datos: ${missingFields.join(", ")}`);
    }

    const products = await getProducts();
    const existingProduct = products.find((product) =>
      isEqual(product.id, parseInt(id))
    );

    if (existingProduct) {
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
      thumbnails,
    };

    products.push(newProduct);

    await addProducts(products);

    io.emit("productAdded", newProduct);

    res.status(200).send(`Producto agregado correctamente`);
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const io = setupAndGetWebSocket();
    const { id } = req.query;
    const products = await getProducts();
    const existingProduct = products.find((product) =>
      isEqual(product.id, parseInt(id))
    );

    if (existingProduct) {
      await deleteProduct(id);

      io.emit("productDeleted", id);

      res.status(200).send("Producto eliminado correctamente");
    } else {
      res.status(404).send("Producto inexistente");
    }
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleGetProduct = async (req, res) => {
  try {
    const { pid: id } = req.params;
    const product = await getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send("Producto inexistente");
    }
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleGetProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).render("pages/products", { products });
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

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

module.exports = {
  handleAddProduct,
  handleDeleteProduct,
  handleGetProduct,
  handleGetProducts,
  handleModifyProduct
};
