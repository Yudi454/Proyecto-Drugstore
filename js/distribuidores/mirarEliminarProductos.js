//Funcion para mostrar mirar productos
const mirarProductos  = async (id) => {

    document.getElementById("botonAgregarProductos").style.display = "none"

    document.getElementById("inputNombreProducto").disabled = true

    document.getElementById("inputCategoriaProducto").disabled = true;

    document.getElementById("inputPrecioProducto").disabled = true;

    document.getElementById("inputFotoProducto").disabled = true;

    const res = await axios(URLPRODUCTOS)

    console.log(id);
    
    const productoEncontrado = res.data.find((producto) => producto.id === id)

    console.log(productoEncontrado);
    

    document.getElementById("inputNombreProducto").value = productoEncontrado.nombre

    document.getElementById("inputCategoriaProducto").value = productoEncontrado.categoria

    document.getElementById("inputPrecioProducto").value = productoEncontrado.precio

    document.getElementById("inputFotoProducto").value = productoEncontrado.foto;

}

//Funcion para eliminar los productos
const handleDeleteProducto = async (id) => {
    try {
        const res = await axios(URLDISTRIBUIDORES);
    
        //Encuentro el distribuidor que seleccione
        const distribuidorEncontrado = res.data.find((distribuidor) => distribuidor.id === idDistribuidorSeleccionado)
    
        //Encuentro la posicion del producto que quiero eliminar
        const index = distribuidorEncontrado.productos.findIndex((producto) => producto.id === id)
    
        //lo elimino
        distribuidorEncontrado.productos.splice(index,1)
        
        //Actualizo el distribuidor
        const res2 = await axios.patch(`${URLDISTRIBUIDORES}/${idDistribuidorSeleccionado}`,distribuidorEncontrado)

        console.log(res2.status);
        

    } catch (error) {
        
        console.log(error);
        
    }

    
    
}