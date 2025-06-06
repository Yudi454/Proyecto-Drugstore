
//Obtenemos el usuario logeado
let usuarioLogeado = JSON.parse(localStorage.getItem("usuario"));


// URL
const API_PETICIONES = "http://localhost:3000/Peticiones";

// Función para obtener las peticiones y cargarlas en las tablas
const cargarPeticiones = async () => {
  try {
    // Solicitar las peticiones al servidor
    const respuesta = await axios.get(API_PETICIONES);
    const peticiones = respuesta.data;

    // Variables para las tablas
    const tablaAjusteStock = document.getElementById("ajusteStockTable");
    const tablaCompra = document.getElementById("compraTable");

    // Limpiar las tablas antes de cargarlas nuevamente
    tablaAjusteStock.innerHTML = "";
    tablaCompra.innerHTML = "";

    // Recorrer las peticiones y añadirlas a la tabla correspondiente
    peticiones.forEach((peticion) => {
      const { id, tipoPeticion, productosPeticion, validada } = peticion;
      const producto = productosPeticion[0];

      // Generar los botones dependiendo del estado de validación y el rol del usuario logeado
      let botones = "";
      if (usuarioLogeado.rol == "Admin") {
        // Si no está validado, mostramos el botón "Validar"
        if (!validada) {
          botones += `<button class="btn btn-sm btn-success" data-id="${id}">Validar</button>`;
        }
        // Siempre mostramos el botón "Eliminar"
        botones += `<button class="btn btn-sm btn-danger" data-id="${id}">Eliminar</button>`;
      }

      // Crear la fila
      const fila = `
        <tr>
          <td>${id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.id}</td>
          <td>${producto.cantidad}</td>
          <td>${validada ? "Validada" : "Pendiente"}</td>
          <td>${botones}</td>
        </tr>
      `;

      // Añadir la fila a la tabla correspondiente
      if (tipoPeticion === "ajuste") {
        tablaAjusteStock.innerHTML += fila; // Agregar a la tabla de ajuste
      } else if (tipoPeticion === "compra") {
        tablaCompra.innerHTML += fila; // Agregar a la tabla de compra
      }
    });
  } catch (error) {
    console.error("Error al cargar las peticiones:", error);
  }
};

// Función para enviar una nueva petición al servidor
const enviarPeticion = async () => {
  // Obtener valores del formulario
  const tipoPeticion = document.getElementById("peticionTipo").value;
  const productoId = document.getElementById("productoId").value;
  const productoNombre = document.getElementById("productoNombre").value;
  const productoCantidad = parseInt(
    document.getElementById("productoCantidad").value
  );

  // Validación de cantidad
  let cantidadValida;
  if (tipoPeticion === "ajuste") {
    cantidadValida = productoCantidad !== 0;
  } else {
    cantidadValida = productoCantidad > 0;
  }

  // Verificar que el producto y la cantidad sean válidos
  if (!productoId || !cantidadValida) {
    alert(
      "Por favor, selecciona un producto y especifica una cantidad válida."
    );
    return;
  }

  // Construir la petición (ID automatico de json)
  const nuevaPeticion = {
    tipoPeticion,
    validada: false, // Valor inicial para "validada"
    productosPeticion: [
      {
        id: productoId,
        nombre: productoNombre,
        cantidad: productoCantidad,
      },
    ],
  };

  try {
    // Enviar la petición al servidor
    const respuesta = await axios.post(API_PETICIONES, nuevaPeticion);
    console.log("Petición agregada correctamente:", respuesta.data);
    alert("La petición se ha enviado correctamente.");

    // Recargar las peticiones para que la nueva se muestre en las tablas
    cargarPeticiones();
  } catch (error) {
    console.error("Error al enviar la petición:", error);
    alert("Hubo un error al enviar la petición.");
  }
};

// Agregar event listener para el formulario de la petición
document.getElementById("formPeticion").addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar el envío del formulario HTML
  enviarPeticion(); // Llamar a la función para validar y enviar la petición
});

// Cargar las peticiones al cargar la página
document.addEventListener("DOMContentLoaded", cargarPeticiones);
