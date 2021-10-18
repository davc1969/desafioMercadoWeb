

const mostrarCarrito = async (req, res) => {
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
};

module.exports = {
    mostrarCarrito
}