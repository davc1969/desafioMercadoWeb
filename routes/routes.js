const routes = require("express").Router();
const comprasController = require("../controllers/compras");
const carritoController = require("../controllers/carrito");


routes.get("/", (req, res) => {
    res.render("index", {
        layout: "index",
        productos: req.listaProductos,
        comprasRealizadas: (req.listaCompras.length > 0),
        comprado: req.listaCompras
    });
})


routes.get("/compras", async (req, res) => {
    comprasController.mostrarCompras(req, res);
});


routes.post("/compra", async (req, res) => {
    comprasController.agregarCompra(req, res);
});

routes.delete("/compra", async (req, res) => {
    comprasController.borrarCompras(req, res);
})


routes.get("/mostrarcarrito", async (req, res) => {
    carritoController.mostrarCarrito(req, res);
})


module.exports = {
    routes
}