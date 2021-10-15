const exp = require("constants");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

require("dotenv").config();
const jsonFiles = require("./services/jsonfiles");

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

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js_bs", express.static(__dirname + "/node_modules/bootstrap/dist/js"))
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"))
app.use("/myjs", express.static(__dirname + "/public/assets/js"))
app.use("/imagenes", express.static(__dirname + "/public/assets/img"));

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

let listaProductos = [];
app.use("/", async (req, res, next) => {
    jsonFiles.readJSONfile(process.env.PRODUCTOS_filename)
    .then((data) => {
        listaProductos = data.productos;
    })
    .catch ( (error) => {
        console.log("Error leyendo archivo de productos", error.message);
    })
    .finally( () => {
        next();
    })
    // fs.readFile(__dirname + process.env.PRODUCTOS_filename, null,(err, data) => {
    //     if (err) {
    //         console.log("Error en lectura de datos JSON ", err.message);
    //     } else {
    //         listaProductos = JSON.parse(data);
    //         next();
    //     }
    // });
})

let listaCompras = [];
app.use("/", async (req, res, next) => {
    jsonFiles.readJSONfile(process.env.COMPRAS_filename)
    .then((data) => {
        listaCompras = data.compras;
    })
    .catch ( (error) => {
        console.log("Error leyendo archivo de productos", error.message);
    })
    .finally( () => {
        next();
    })
    // fs.readFile(__dirname + process.env.PRODUCTOS_filename, null,(err, data) => {
    //     if (err) {
    //         console.log("Error en lectura de datos JSON ", err.message);
    //     } else {
    //         listaProductos = JSON.parse(data);
    //         next();
    //     }
    // });
})


app.get("/", (req, res) => {
    res.render("index", {
        layout: "index",
        productos: listaProductos,
        comprasRealizadas: (listaCompras.length > 0),
        comprado: listaCompras
    });
});

app.post("/compra", async (req, res) => {
    try {
        await jsonFiles.addToJSONfile(process.env.COMPRAS_filename, req.body);
        res.sendStatus(200);
        location.reload;
    } catch (error) {
        console.log("Error agregando compra: ", error.message);
        res.sendStatus(500)
    }
});

app.delete("/compra", async (req, res) => {
    try {
        await jsonFiles.clearJSONfile(process.env.COMPRAS_filename);
        //res.sendStatus(200);
        res.redirect("/");
    } catch (error) {
        console.log("Error borrando compra: ", error.message);
        res.sendStatus(500)
    }
})


app.get("/compras", async (req, res) => {
    jsonFiles.readJSONfile(process.env.COMPRAS_filename)
    .then((data) => {
        listaCompras = data.compras;
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(listaCompras));
    })
    .catch ( (error) => {
        console.log("Error leyendo archivo de productos", error.message);
    })
});

app.get("/mostrarcarrito", async (req, res) => {
    let listaCarrito = [];
    let totalCompra = 0;
    listaCompras.map( (prod) => {
        const idxProd = listaProductos.findIndex( (p) =>  p.nombre == prod.producto );
        prod.precio = listaProductos[idxProd].precio * prod.cantidad;
        totalCompra += prod.precio;
        listaCarrito.push(prod)
    })

    console.log("ttt", totalCompra);
    res.render("carrito", {
        layout: "carrito",
        productos: listaCarrito,
        total: totalCompra
    });
})