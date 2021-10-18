const jsonFiles = require("../services/jsonfiles");
const path = require("path");

const mostrarCompras = async (req, res) => {
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
};

const agregarCompra = async (req, res) => {
    try {
        await jsonFiles.addToJSONfile(path.join(__dirname, "..", process.env.COMPRAS_filename), req.body);
        res.sendStatus(200);
        location.reload;
    } catch (error) {
        console.log("Error agregando compra: ", error.message);
        res.sendStatus(500)
    }
};

const borrarCompras = async (req, res) => {
    try {
        await jsonFiles.clearJSONfile(path.join(__dirname, "..", process.env.COMPRAS_filename));
        res.status(201);
        res.redirect("/");
    } catch (error) {
        console.log("Error borrando compra: ", error.message);
        res.sendStatus(500)
    }
}

module.exports = {
    mostrarCompras,
    agregarCompra,
    borrarCompras
}