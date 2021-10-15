
//tests
console.log("Estamos en main del html");

function comprarProducto(imagen, nombre, precio) {
    document.getElementById("nombreCompra").innerHTML = nombre;
    document.getElementById("imagenCompra").src = `/imagenes/${imagen}`;
    document.getElementById("precioCompra").innerHTML = `${precio} $/kg`

    $("#modalCompra").modal('show');
};

const botonAgregarProducto = document.getElementById("agregarProducto");
botonAgregarProducto.addEventListener("click", async (event) => {
    event.defaultPrevented;
    const productoComprado = document.getElementById("nombreCompra").innerHTML;
    const cantidadComprada = document.getElementById("cantidadCompra").value;

    try {
        const response = await fetch("/compra", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "producto": productoComprado,
                "cantidad": cantidadComprada
            })
        });
        alert ("Se agregó el producto: " + productoComprado + " a su lista de compras")
    } catch (error) {
        console.log("Error agregando producto, ", error.message);
    } finally {
        console.log("Llegamos al finall");
        $("#modalCompra").modal('hide');
        location.reload();
        
    }
    
});

