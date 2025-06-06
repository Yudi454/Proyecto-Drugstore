// URL API en buscador.js y peticion.js

// Función para validar una petición
const validarPeticion = async (id) => {

  try {
    // Obtener la petición con el ID
    const respuesta = await axios.get(`${API_PETICIONES}/${id}`);
    const peticion = respuesta.data;
    const productoPeticion = peticion.productosPeticion[0];

    // Convertir cantidad de la petición a número
    const cantidadPeticion = parseInt(productoPeticion.cantidad, 10);
    if (isNaN(cantidadPeticion)) {
      console.error("La cantidad de la petición no es válida.");
      return;
    }

    // Obtener el producto a modificar
    const productosRespuesta = await axios.get(API_PRODUCTOS);
    const producto = productosRespuesta.data.find(
      (prod) => prod.id === productoPeticion.id
    );
    

    if (producto) {
      
      // Convertir cantidad del producto a número
      const cantidadProducto = parseInt(producto.cantidad, 10);
      if (isNaN(cantidadProducto)) {
        console.error(
          "La cantidad del producto en el distribuidor no es válida."
        );
        return;
      }

      // Actualizar la cantidad del producto
      producto.cantidad = cantidadProducto + cantidadPeticion;

      // Actualizar el distribuidor con la cantidad modificada
      await axios.put(`${API_PRODUCTOS}/${producto.id}`, producto);

      // Cambiar el estado de la petición a validada
      peticion.validada = true;
      await axios.put(`${API_PETICIONES}/${id}`, peticion);

      // Recargar las peticiones
      cargarPeticiones();
    } else {
      console.error("Producto no encontrado.");
    }
  } catch (error) {
    console.error("Error al validar la petición:", error);
  }
};

// Función para eliminar una petición
const eliminarPeticion = async (id) => {
  try {
    // Obtener la petición con el ID
    const respuesta = await axios.get(`${API_PETICIONES}/${id}`);
    const peticion = respuesta.data;
    const productoPeticion = peticion.productosPeticion[0];

    // Convertir cantidad de la petición a número
    const cantidadPeticion = parseInt(productoPeticion.cantidad, 10);
    if (isNaN(cantidadPeticion)) {
      console.error("La cantidad de la petición no es válida.");
      return;
    }

    // Obtener el producto a modificar
    const productosRespuesta = await axios.get(API_PRODUCTOS);
    const producto = productosRespuesta.data.find(
      (prod) => prod.id === productoPeticion.id
    );

    if (producto) {
      
      // Convertir cantidad del producto a número
      const cantidadProducto = parseInt(producto.cantidad, 10);
      if (isNaN(cantidadProducto)) {
        console.error(
          "La cantidad del producto en el distribuidor no es válida."
        );
        return;
      }

      // Revertir el ajuste de stock en el producto
      producto.cantidad = cantidadProducto - cantidadPeticion;

      // Actualizar el distribuidor con la cantidad modificada
      await axios.put(`${API_PRODUCTOS}/${producto.id}`, producto);

      // Eliminar la petición
      await axios.delete(`${API_PETICIONES}/${id}`);

      // Recargar las peticiones
      cargarPeticiones();
    } else {
      console.error("Producto no encontrado.");
    }
  } catch (error) {
    console.error("Error al eliminar la petición:", error);
  }
};

// Agregar event listeners a los botones
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ajusteStockTable").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-success")) {
      const id = e.target.getAttribute("data-id");
      validarPeticion(id);
    } else if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");
      eliminarPeticion(id);
    }
  });

  document.getElementById("compraTable").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-success")) {
      const id = e.target.getAttribute("data-id");
      validarPeticion(id);
    } else if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");
      eliminarPeticion(id);
    }
  });
});
