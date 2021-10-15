const botonPagarProductos = document.getElementById("botonPagar");
botonPagarProductos.addEventListener("click", async (event) => {
    event.defaultPrevented;
    console.log("Llegamos a boton pagar");
    alert("OK, ya pagó y su pedido le llegará pronto")
    
    try {
        const response = await fetch("/compra", {
            method: "delete",
        });
    } catch (error) {
        console.log("Error pagando productos, ", error.message);
    } finally {
        location.href="/"
    }
    
})