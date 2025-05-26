const handlebars = require("express-handlebars");
const path = require("path");

const setupHandlebars = (app) => {
    app.engine(
      "hbs",
      handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
      })
    );
    
    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../views"));
}

module.exports = setupHandlebars;