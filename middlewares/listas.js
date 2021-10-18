const app = require("express")();
const path = require("path")
const jsonFiles = require("../services/jsonfiles");


app.use("/", async (req, res, next) => {
    const archivo = path.join(__dirname, "..", process.env.PRODUCTOS_filename);
    jsonFiles.readJSONfile(archivo)
    .then((data) => {
        req.listaProductos = data.productos;
    })
    .catch ( (error) => {
        console.log("Error leyendo archivo de productos", error.message);
    })
    .finally( () => {
        next();
    })
});


app.use("/", async (req, res, next) => {
    const archivo = path.join(__dirname, "..", process.env.COMPRAS_filename);
    jsonFiles.readJSONfile(archivo)
    .then((data) => {
        req.listaCompras = data.compras;
    })
    .catch ( (error) => {
        console.log("Error leyendo archivo de productos", error.message);
    })
    .finally( () => {
        next();
    })
});


app.use("/", async (req, res, next) => {
    const archivo = path.join(__dirname, "..", process.env.USUARIOS_filename);
    jsonFiles.readJSONfile(archivo)
    .then( (data) => {
        req.usuario = data.usuario[0].nombre
    })
    .catch( (error) => {
        console.log("Error leyendo usuario: ", error.message);
    })
    .finally( () => {
        next();
    })
})


module.exports = {
    app
}