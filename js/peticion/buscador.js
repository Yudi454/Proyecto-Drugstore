// URL
const API_DISTRIBUIDORES = "http://localhost:3000/Distribuidores";
const API_PRODUCTOS = "http://localhost:3000/productos";

let distribuidores = [];

// Función para cargar proveedores en el menú desplegable
const cargarProveedores = async () => {
  try {
    const respuesta = await axios.get(API_DISTRIBUIDORES);
    distribuidores = respuesta.data;

    const selectProveedor = document.getElementById("filtrarProveedor");
    selectProveedor.innerHTML =
      '<option value="">Todos los Proveedores</option>';

    distribuidores.forEach((distribuidor) => {
      const option = document.createElement("option");
      option.value = distribuidor.id;
      option.textContent = distribuidor.nombre;
      selectProveedor.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar los proveedores:", error);
  }
};

// Función para cargar productos filtrados
const cargarProductos = async (filtro = "", proveedorId = "") => {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = ""; // Limpiar la lista antes de agregar productos

  let productosFiltrados = []
  try {
    const respuestaProductos = await axios.get(API_PRODUCTOS);
    const productos = respuestaProductos.data;
    

    productosFiltrados = productos;
    if (proveedorId) {
      const distribuidor = distribuidores.find(
        (dist) => dist.id === proveedorId
      );
      if (distribuidor) {
        // Extraer los IDs de los productos del distribuidor
        let idProductos = distribuidor.productos.map((prod) => prod.id);
        // Filtrar los productos de la base de datos con los IDs obtenidos
        productosFiltrados = productos.filter((producto) =>
          idProductos.includes(producto.id)
        );
      }
    }
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }

  productosFiltrados = productosFiltrados.filter((producto) =>
      producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      producto.id.toString().includes(filtro)
  );

  productosFiltrados.forEach((producto) => {
    const item = document.createElement("li");
    item.className = "list-group-item list-group-item-action";
    item.textContent = `${producto.id} - ${producto.nombre}`;
    item.onclick = () => seleccionarProducto(producto);
    lista.appendChild(item);
  });
};

// Función para seleccionar un producto y actualizar los campos del formulario
const seleccionarProducto = (producto) => {
  document.getElementById("productoId").value = producto.id;
  document.getElementById("productoNombre").value = producto.nombre;
  document.getElementById("productoStock").value = producto.cantidad;
  document.getElementById("productoCantidad").value = 1; // Resetear la cantidad al seleccionar el producto
  validarFormulario(); // Validar después de seleccionar el producto
};

// Función para validar el formulario y habilitar/deshabilitar el botón de agregar
const validarFormulario = () => {
  const productoId = document.getElementById("productoId").value;
  const productoCantidad = parseInt(
    document.getElementById("productoCantidad").value
  );
  const tipoPeticion = document.getElementById("peticionTipo").value;
  const btnAgregarPeticion = document.getElementById("btnAgregarPeticion");

  // Habilita el botón solo si el producto está seleccionado y la cantidad es válida
  let cantidadValida;

  if (tipoPeticion === "ajuste") {
    // Si es un ajuste, la cantidad puede ser diferente de cero (positivo o negativo)
    cantidadValida = productoCantidad !== 0;
  } else {
    // Si es una compra, la cantidad debe ser mayor a 0
    cantidadValida = productoCantidad > 0;
  }

  if (productoId && cantidadValida) {
    btnAgregarPeticion.disabled = false;
  } else {
    btnAgregarPeticion.disabled = true;
  }
};

// Event listener para la búsqueda de productos
document.getElementById("buscarProducto").addEventListener("input", (e) => {
  const filtroProveedor = document.getElementById("filtrarProveedor").value;
  cargarProductos(e.target.value, filtroProveedor);
});

// Event listener para filtrar productos por proveedor
document.getElementById("filtrarProveedor").addEventListener("change", (e) => {
  const filtroProducto = document.getElementById("buscarProducto").value;
  cargarProductos(filtroProducto, e.target.value);
});

// Cargar proveedores y productos al abrir el modal
document
  .getElementById("crearPeticionModal")
  .addEventListener("show.bs.modal", async () => {
    await cargarProveedores();
    cargarProductos();
    validarFormulario(); // Validar el estado del formulario al abrir el modal
  });

// Event listener para el cambio de tipo de petición
document
  .getElementById("peticionTipo")
  .addEventListener("change", validarFormulario);

// Agregar event listener para el formulario de la petición
document.getElementById("formPeticion").addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar el envío del formulario si no está completo

  // Aquí no hacemos nada más, ya que todo el proceso de validación y envío se maneja en otro archivo
  console.log("Formulario enviado");
});
