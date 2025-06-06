//Url de productos
const base = "http://localhost:3000/productos";
const API_DISTRIBUIDORES= "http://localhost:3000/Distribuidores"

//Donde mostrar los productso
let caja = document.getElementById("sect");

//Donde voy a guardar el id del producto seleccionado
let productoActualId = "";

//Valor menor que sirve para el slice
let menorProducto = 0;
//Valor mayor que sirve para el slice
let mayorProducto = 0;
//Sirve para contar la cantidad total de elementos que mostramos
let contadorPaginaProducto = 0;
//Valida literalmente si la flecha derecha fue clickeada
let flechaDerechaClickeada = false;
//Permite restar cuando se clickea la flecha izquierda, empieza en true, para que cuando se llegue al limite de elementos
//Se bloquee este y no reste de mas, ej si tenemos 15 elementos, se bloquea asi solo se reste 5 y no 15
let permitirRestarContador = true;

//Obtenemos el usuario logeado
let usuarioLogeado = JSON.parse(localStorage.getItem("usuario"));
//console.log(usuarioLogeado.rol)

//Funcion para eliminar los productos
const eliminarProducto = async (id) => {
  //Restringimos la eliminación de productos
  if (usuarioLogeado.rol == "Admin") {
    try {
      //Eliminamos el producto de la base de datos de productos
      let response = await axios.delete(`${base}/${id}`);

      if (response) {
        // Ahora eliminamos el id del producto de los distribuidores
        let proveedores = await axios.get(`${API_DISTRIBUIDORES}`); // Obtén la lista de distribuidores (proveedores)

        // Recorremos los distribuidores y eliminamos el id del producto de su lista
        for (let proveedor of proveedores.data) {
          // Comprobamos si el proveedor tiene el producto en su lista de productos
          if (proveedor.productos.some(producto => producto.id === id)) {
            // Eliminar el producto de la lista de productos del proveedor
            await axios.delete(`${API_DISTRIBUIDORES}/${proveedor.id}/productos/${id}`);
          }
        }

        alert("Producto y proveedor actualizados correctamente.");
      } else {
        alert("Algo no anda bien con la eliminación.");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Usuario no habilitado para realizar esta acción");
  }
};

//Funcion para abrir el menu de editar
const abrirMenu = async (id) => {
  //restringimos la edicion de productos
  if (usuarioLogeado.rol == "Admin") {
    //Guardo el id del producto
    productoActualId = id;

    try {
      let response = await axios.get(`${base}/${id}`);

      const producto = response.data;

      //Pongo los valores en los inputs
      document.getElementById("nombre").value = producto.nombre;
      document.getElementById("cantidad").value = producto.cantidad;
      document.getElementById("precio").value = producto.precio;
      document.getElementById("categoria").value = producto.categoria;
      document.getElementById("imagen").value = producto.imagen;

      //Muestro el menu de editar
      document.getElementById("menu-editar").style.display = "block";
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Usuario no habilitado para realizar esta acción");
  }
};

//Funcion para cerrar el menu
const cerrarMenu = () => {
  document.getElementById("menu-editar").style.display = "none";
};

//Funcion para editar
const guardarCambios = async (e) => {
  e.preventDefault();

  //Guardo los valores
  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;
  const imagen = document.getElementById("imagen").value;
  try {
    let response = await axios.put(`${base}/${productoActualId}`, {
      nombre,
      cantidad,
      precio,
      categoria,
      imagen,
    });

    alert.log("Producto actualizado");
    //Cierra el menu
    cerrarMenu();
    //No existe la funcion, cuando exista la agregamos
    //cargarProductos();
  } catch (error) {
    console.error(error);
  }
};

//Muestra los productos apenas se abre la página
const prueba = async () => {

  caja.innerHTML = ""
  
  if (mayorProducto === 0) {
    mayorProducto = 10
  }

  try {
    let response = await axios.get(base);

  //Array donde guardare los 10 productos
  let productosPorPagina = [];

  //Con slice corto el string para traer los primeros 10, siguientes, anteriores valores
  productosPorPagina = response.data.slice(menorProducto, mayorProducto);

  //Si es la primera vez que abre la pagina y por lo tanto el valor es 0, voy sumando a ese contador
  //La cantidad de ventas que estoy agarrando de la cantidad total, que en este caso es de 10 en 10
  if (contadorPaginaProducto == 0 || flechaDerechaClickeada) {
    contadorPaginaProducto += productosPorPagina.length;
    flechaDerechaClickeada = false;
  }

  //Si estoy en los primeros 10 valores no muestro el boton para retroceder
  //Los valores representan las posiciones de los elementos en el array para el slice
  if (menorProducto == 0 && mayorProducto == 10) {
    flechaIzquierda.style.display = "none";
    //Si no me encuentro en los primeros 10 valores habilito el boton para rtroceder
  } else {
    flechaIzquierda.style.display = "block";
  }

  //Si en el array total de ventas, en la posicion siguiente a la final no hay nada devuelve un undefined
  //Para saber la posicion uso el valor de la cantidad total de paginas que estoy mostrando + 1
  //Eso es para cuando el array total no termina en un numero con terminacion 0
  //Si, si lo valido restando el valor maximo que sirve para el slic con el length de las ventas totales
  //Si se cumple eso dehabilito la flecha derecha y para que el contador cambie de valor le resto el 2 digito, ej a 18 le resto 8
  if (
    response.data[contadorPaginaProducto + 1] == undefined ||
    mayorProducto - response.data.length == 0
  ) {
    //Bloqueo el permitir restar para que solo reste el segundo digito
    permitirRestarContador = false;
    flechaDerecha.style.display = "none";
    contadorPaginaProducto -= contadorPaginaProducto % 10;

    //Si no muestro el boton
  } else {
    flechaDerecha.style.display = "block";
  }


    //Muestro los productos
    productosPorPagina.map(
      (producto) =>
        (caja.innerHTML += /* HTML */ `
          <article class="sectProducto">
            <figure class="fotoPrducto">
              <img class="img-fluid" src="${producto.imagen}" alt="" />
            </figure>
            <section class="productInfo">
              <h2>${producto.nombre}</h2>
              <p><strong>Categoría:</strong>${producto.categoria}</p>
              <p><strong>Cantidad:</strong>${producto.cantidad}</p>
              <p><strong>Precio:</strong> $${producto.precio}</p>
            </section>
            <section class="edit row">
              <button
                class="boton editar"
                onClick="abrirMenu('${producto.id}')"
              >
                Editar
              </button>
              <button
                class="boton eliminar"
                onClick="eliminarProducto('${producto.id}')"
              >
                Eliminar
              </button>
            </section>
          </article>
        `)
    );
  } catch (error) {
    console.error(error);
  }
};

prueba();

flechaDerecha.addEventListener("click", () => {

  const valores = mostrarMas(mayorProducto,menorProducto)
  
  mayorProducto = valores.mayor
  menorProducto = valores.menor
  flechaDerechaClickeada = valores.flechaDerechaClickeada;
  
  prueba();
});

flechaIzquierda.addEventListener("click", () => {
  const valores = mostrarMenos(mayorProducto,menorProducto,permitirRestarContador,contadorPaginaProducto);

  mayorProducto = valores.mayor;
  menorProducto = valores.menor;
  permitirRestarContador = valores.permitirRestarContador;
  contadorPaginaProducto = valores.contador;

  prueba();
});

document.getElementById("btnCerrarMenu").addEventListener("click", cerrarMenu)

document.getElementById("form-editar").addEventListener("submit",guardarCambios)