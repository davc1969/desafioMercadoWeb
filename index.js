const exp = require("constants");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

require("dotenv").config();

const { routes } = require("./routes/routes");
const listas = require("./middlewares/listas");

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => { console.log(`Server is up and listening by port ${PORT} `);});

app.set("view engine", "handlebars");
app.engine(
    "handlebars",
    exphbs({
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/partials/"
    })
);

app.use(express.json());
//app.use(express.urlencoded({ extend: true }));

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js_bs", express.static(__dirname + "/node_modules/bootstrap/dist/js"))
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"))
app.use("/myjs", express.static(__dirname + "/public/assets/js"))
app.use("/imagenes", express.static(__dirname + "/public/assets/img"));


app.use(listas.app);

app.use(routes);

