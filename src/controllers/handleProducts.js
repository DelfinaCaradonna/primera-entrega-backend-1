const { isEqual } = require("lodash");

const Product = require("../models/productsModel");
const setupAndGetWebSocket = require("../config/websocket");
const getProducts = require("../services/products/getProducts");
const getProductById = require("../services/products/getProductById");
const deleteProduct = require("../services/products/deleteProduct");
const updateProduct = require("../services/products/updateProduct");
const addProduct = require("../services/products/addProduct");

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
      _id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    const missingFields = ALLOWED_FIELDS.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send(`Faltan datos: ${missingFields.join(", ")}`);
    }

    const products = await getProducts();

    const existingProduct =
      products &&
      products.find((product) => isEqual(product.title, parseInt(title)));

    if (existingProduct) {
      return res.status(400).send("Producto ya existente");
    }

    const newProduct = {
      id: _id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const product = await addProduct(newProduct);

    io.emit("productAdded", product);

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
      isEqual(product.id, id.toString())
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
    const { page, limit, category, sort = 'asc' } = req.query;
    const priceValue = sort === "asc" ? 1 : -1;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 5,
      sort: { price: priceValue },
      lean: true,
    };
    const findParameters = {
      ...(category && { category }),
    };

    const getLink = (req, page) => {
      const defaultQuery = {
        page,
        limit: options.limit,
        ...(category && { category }),
        ...(sort && { sort }),
      };

      const query = new URLSearchParams(defaultQuery);
      return `${req.baseUrl}${req.path}?${query.toString()}`;
    };

    const result = await Product.paginate(findParameters, options);
    const products = await getProducts();

    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    res.status(200).render("pages/products", {
      products: result.docs.map((p) => ({ ...p, id: p._id })),
      categories,
      selectedCategory: category,
      selectedSort: sort,
      pagination: {
        status: "success",
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? getLink(req, result.prevPage) : null,
        nextLink: result.hasNextPage ? getLink(req, result.nextPage) : null,
      },
    });
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

const handleModifyProduct = async (req, res) => {
  try {
    const { pid: id } = req.params;

    const bodyKeys = Object.keys(req.body);
    const invalidKeys = bodyKeys.filter((key) => !ALLOWED_FIELDS.includes(key));

    if (invalidKeys.length > 0) {
      return res
        .status(400)
        .json(`Los parámetros ingresados no son válidos: ${invalidKeys}`);
    }

    const products = await getProducts();
    const existingProduct = products.find((product) => {
      return isEqual(product.id, id.toString());
    });

    if (!existingProduct) {
      return res.status(404).send("Producto inexistente");
    }

    await updateProduct(id, req);

    res.status(200).json("Producto editado correctamente");
  } catch (error) {
    res.status(500).send(`Error interno del servidor ${error}`);
  }
};

module.exports = {
  handleAddProduct,
  handleDeleteProduct,
  handleGetProduct,
  handleGetProducts,
  handleModifyProduct,
};
