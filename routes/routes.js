const routes = require("express").Router();
const jsonFiles = require("../services/jsonfiles");
const path = require("path")

routes.get("/", (req, res) => {
    res.render("index", {
        layout: "index",
        productos: req.listaProductos,
        comprasRealizadas: (req.listaCompras.length > 0),
        comprado: req.listaCompras
    });
})


routes.get("/compras", async (req, res) => {
    jsonFiles.readJSONfile(path.join(__dirname, "..", process.env.COMPRAS_filename))
    .then((data) => {
        listaCompras = data.compras;
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(listaCompras));
    })
    .catch ( (error) => {
        res.status(500);
        res.send("Error, no es posible mostrar la información solicitada")
        console.log("Error leyendo archivo de productos", error.message);
    })
});


routes.post("/compra", async (req, res) => {
    try {

        await jsonFiles.addToJSONfile(path.join(__dirname, "..", process.env.COMPRAS_filename), req.body);
        res.sendStatus(200);
        location.reload;
    } catch (error) {
        console.log("Error agregando compra: ", error.message);
        res.sendStatus(500)
    }
});

routes.delete("/compra", async (req, res) => {
    try {
        await jsonFiles.clearJSONfile(path.join(__dirname, "..", process.env.COMPRAS_filename));
        //res.sendStatus(200);
        res.redirect("/");
    } catch (error) {
        console.log("Error borrando compra: ", error.message);
        res.sendStatus(500)
    }
})


routes.get("/mostrarcarrito", async (req, res) => {
    let listaCarrito = [];
    let totalCompra = 0;
    req.listaCompras.map( (prod) => {
        const idxProd = req.listaProductos.findIndex( (p) =>  p.nombre == prod.producto );
        prod.precio = req.listaProductos[idxProd].precio * prod.cantidad;
        totalCompra += prod.precio;
        listaCarrito.push(prod)
    })
    res.render("carrito", {
        layout: "carrito",
        productos: listaCarrito,
        total: totalCompra
    });
})

routes.post("/usuarios", async (req, res) => {
    try {
        await jsonFiles.addToJSONfile(path.join(__dirname, "..", process.env.USUARIOS_filename), req.body);
        res.status(200);
        res.redirect("/");
    } catch (error) {
        console.log("Error agregando compra: ", error.message);
        res.sendStatus(500)
    }
});




module.exports = {
    routes
}