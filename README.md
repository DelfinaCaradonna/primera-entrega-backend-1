# 🧠 Programación Backend I: Desarrollo Avanzado de Backend

## 👩🏼‍💻 Alumna: Delfina Caradonna

## 📦 Primera Entrega

Este proyecto corresponde a la **Primera Entrega** del curso **Programación Backend I**, centrado en el desarrollo avanzado de aplicaciones backend utilizando Node.js y Express.

### 🛠️ Tecnologías Utilizadas
- Node.js
- Express
- JavaScript
- dotenv
- nodemon 

```bash
📦 proyecto-backend
├── 📂 src
│   ├── 📂 controllers
│   │   ├── 📂 carts
│   │   │   ├── handleAddCart.js
│   │   │   ├── handleAddProductsInCart.js
│   │   │   └── handleGetCart.js
│   │   └── 📂 products
│   │       ├── handleAddProduct.js
│   │       ├── handleDeleteProduct.js
│   │       ├── handleGetProduct.js
│   │       ├── handleGetProducts.js
│   │       └── handleModifyProduct.js
│   ├── 📂 db
│   │   ├── carts.json
│   │   └── products.json
│   ├── 📂 routes
│   │   ├── carts.js
│   │   └── products.js
│   ├── 📂 services
│   │   ├── 📂 carts
│   │   │   ├── addCarts.js
│   │   │   ├── getCartById.js
│   │   │   └── getCarts.js
│   │   └── 📂 products
│   │       ├── addProducts.js
│   │       ├── deleteProduct.js
│   │       ├── getProductById.js
│   │       ├── getProducts.js
│   │       └── modifyProduct.js
│   └── app.js
└── index.js