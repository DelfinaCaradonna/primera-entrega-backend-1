const mongoose = require("mongoose");

const setupMongoose = (MONGO_URI) => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas conectado"))
    .catch((err) => console.error("Error de conexión:", err));
};

module.exports = setupMongoose;
