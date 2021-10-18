
console.log("Estamos en main del html");


function comprarProducto(imagen, nombre, precio) {
    document.getElementById("nombreCompra").innerHTML = nombre;
    document.getElementById("imagenCompra").src = `/imagenes/${imagen}`;
    document.getElementById("precioCompra").innerHTML = `${precio} $/kg`

    $("#modalCompra").modal('show');
};


document.getElementById("agregarProducto").addEventListener("click", async (event) => {
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



document.getElementById("enterUser").addEventListener("click", (event) => {
    event.preventDefault;
    console.log("Boton usuario presionado");
    $("#modalUsuario").modal('show');
})



document.getElementById("botonUsuarioIngresado").addEventListener("click", async (event) => {
    event.preventDefault;

    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const passwordUsuario = document.getElementById("passwordUsuario").value;

    localStorage.setItem("usuarioRegistrado", nombreUsuario);
    $("#modalUsuario").modal('hide');
    location.reload();

});


document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuarioRegistrado")
    if (usuario) {
        document.getElementById("enterUser").innerHTML = `Hola ${usuario}`;
    }
});


