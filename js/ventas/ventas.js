//Array para guardar los datos y no realizar muchas peticiones
let ventas = [];

//Array para guardar los productos
let productos = [];

const URLVENTAS = "http://localhost:3000/Ventas";

const URLPRODUCTOS = "http://localhost:3000/productos";

const cuerpoTablaVenta = document.getElementById("cuerpoTabla");

const flechaIzquierda = document.getElementById("flechaIzquierda");

const flechaDerecha = document.getElementById("flechaDerecha");

const cuerpoTablaProducto = document.getElementById("cuerpoProducto");

const modalCuerpoVenta = document.getElementById("formularioVenta");

//Valor menor que sirve para el slice
let menorVenta = 0;
//Valor mayor que sirve para el slice
let mayorVenta = 0;
//Sirve para contar la cantidad total de elementos que mostramos
let contadorPaginaVenta = 0;
//Valida literalmente si la flecha derecha fue clickeada
let flechaDerechaClickeada = false;
//Permite restar cuando se clickea la flecha izquierda, empieza en true, para que cuando se llegue al limite de elementos
//Se bloquee este y no reste de mas, ej si tenemos 15 elementos, se bloquea asi solo se reste 5 y no 15
let permitirRestarContador = true;

//Guardo el id de la venta selccionada
let idVentaSeleccionada = "";

//Sirve para diferenciar el modal de mirar del de editar
let permitirEditar = false;



//Funcion para mostrar el cajero y ocultar lo demas
const mostrarCajero = () => {
  window.location.href = "../cajero/cajero.html"
};

//Funcion para cuando clickeo mirar
const handleMirar = (id) => {
  console.log("funciono boton mirar");
  document.getElementById("contenedorAgregarProducto").classList.add("d-none")
  traerProductos(id);
  cargarCuerpoModal(false);
};

//Funcion para cuando clickeo editar
const handleEditar = (id) => {
  console.log("funciono boton Editar");
  document.getElementById("contenedorAgregarProducto").classList.remove("d-none")
  traerProductos(id);
  cargarCuerpoModal(true);
};

//Funcion para cuando clickeo eliminar
const handleDelete = async (id) => {
  console.log(id);

  try {
    const res = axios.delete(`${URLVENTAS}/${id}`);

    console.log(res.status);
  } catch (error) {
    console.log(error);
  }
};

//Funcion para cuando clickeo eliminar a un producto
const handleEliminarProducto = (id) => {
  //Traigo la venta que seleccione
  const ventaSeleccionada = ventas.find(
    (venta) => venta.id === idVentaSeleccionada
  );

  //Traigoel producto que seleccione
  const productoSeleccionado = ventaSeleccionada.productos.findIndex(
    (producto) => producto.id === id
  );

  //Le quito el producto a la venta que traje
  ventaSeleccionada.productos.splice(productoSeleccionado, 1);

  console.log(ventaSeleccionada);

  try {
    //Actualizo dicha venta con el id y pasandole la venta sin el objeto
    const res = axios.patch(
      `${URLVENTAS}/${idVentaSeleccionada}`,
      ventaSeleccionada
    );

    console.log(res);

    console.log(res.status);

    alert("Venta eliminada con exito");
  } catch (error) {
    alert("Error al eliminar la venta");
  }
};

//Funcion para traer los objetos ventas y mostrarlos
const traerVentas = async () => {
  if (mayorVenta === 0) {
    //Seteo el valor mayor en 10, para que me muestre hasta la posicion 10 en este caso
    mayorVenta = 10;
  }

  //Primero borro lo que ya esta
  cuerpoTablaVenta.innerHTML = "";

  const res = await axios(URLVENTAS);

  const datos = await res.data;

  //Guardo todos los datos en el array para despues usarlos en productos
  ventas = datos;

  //Array donde guardare las 10 ventas
  let ventasPorPagina = [];

  //Con slice corto el string para traer los primeros 10, siguientes, anteriores valores
  ventasPorPagina = ventas.slice(menorVenta, mayorVenta);

  //Si es la primera vez que abre la pagina y por lo tanto el valor es 0, voy sumando a ese contador
  //La cantidad de ventas que estoy agarrando de la cantidad total, que en este caso es de 10 en 10
  if (contadorPaginaVenta == 0 || flechaDerechaClickeada) {
    contadorPaginaVenta += ventasPorPagina.length;
    flechaDerechaClickeada = false;
  }

  //Si estoy en los primeros 10 valores no muestro el boton para retroceder
  //Los valores representan las posiciones de los elementos en el array para el slice
  if (menorVenta == 0 && mayorVenta == 10) {
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
    ventas[contadorPaginaVenta + 1] == undefined ||
    mayorVenta - ventas.length == 0
  ) {
    //Bloqueo el permitir restar para que solo reste el segundo digito
    permitirRestarContador = false;
    flechaDerecha.style.display = "none";
    contadorPaginaVenta -= contadorPaginaVenta % 10;

    //Si no muestro el boton
  } else {
    flechaDerecha.style.display = "block";
  }

  //Recorro las 10 ventas para mostrarlas
  ventasPorPagina.map(
    (venta) =>
      (cuerpoTablaVenta.innerHTML += `
        <tr onClick="traerProductos('${venta.id}')">
        <td>${venta.id}</td>
        <td>${venta.fecha}</td>
        <td>${venta.total}</td>
        <td>${venta.vendedor}</td>
        <td>
        <button onClick="handleMirar('${venta.id}')" class=" btn btnAcciones" type="button" data-bs-toggle="modal" data-bs-target="#modalVentas" ><i class="fa-solid fa-eye"></i></button>
        <button onClick="handleEditar('${venta.id}')" class="btn btnAcciones" type="button" data-bs-toggle="modal" data-bs-target="#modalVentas" ><i class="fa-solid fa-pen-to-square"></i></button>
        <button onClick="handleDelete('${venta.id}')" class=" btn btnAcciones" type="button"><i class="fa-solid fa-delete-left"></i></button>
        </td>
    </tr>
    `)
  );
};

const cargarCuerpoModal = async (editar) => {
  //Encuentro la venta que clickeo para usarla
  let ventaEncontrada = ventas.find(
    (venta) => venta.id === idVentaSeleccionada
  );

  console.log(ventaEncontrada);

  console.log(ventaEncontrada.metodoDePago);

  //Guardo todos los input
  const inputId = document.getElementById("inputId");
  const inputFecha = document.getElementById("inputFecha");
  const inputTotal = document.getElementById("inputTotal");
  const inputVendedor = document.getElementById("inputVendedor");
  const inputDescuento = document.getElementById("inputDescuento");
  const inputmetodoDePago = document.getElementById("metodoDePago");

  //Traigo todos los valores
  inputId.value = ventaEncontrada.id;
  inputFecha.value = ventaEncontrada.fecha;
  inputTotal.value = ventaEncontrada.total;
  inputVendedor.value = ventaEncontrada.vendedor;
  inputDescuento.value = ventaEncontrada.descuento;
  inputmetodoDePago.value = ventaEncontrada.metodoDePago;

  //Si clickeo editar hago esto
  if (editar) {
    inputFecha.disabled = false;
    inputTotal.disabled = false;
    inputVendedor.disabled = false;
    inputDescuento.disabled = false;
    inputmetodoDePago.disabled = false;

    try {
      //Limpio antes de cargar
      document.getElementById("agregarProductos").innerHTML = "";

      const res = await axios(URLPRODUCTOS);

      productos = await res.data;

      console.log(productos);

      //Cargo todos los productos en el input
      productos.map(
        (producto) =>
          (document.getElementById("agregarProductos").innerHTML += `
                          <option value="${producto.nombre}">${producto.nombre}</option>
      `)
      );
    } catch (error) {
      console.log(error);
    }
    //Si clickeo mirar hago esto
  } else {
    inputFecha.disabled = true;
    inputTotal.disabled = true;
    inputVendedor.disabled = true;
    inputDescuento.disabled = true;
    inputmetodoDePago.disabled = true;
  }
};

//Funcion para traer los productos por venta
traerProductos = (id) => {
  //Limpio la tabla
  cuerpoTablaProducto.innerHTML = "";

  //Limpio id para no usar siempre el mismo
  idVentaSeleccionada = "";

  //Le seteo el id que recibo
  idVentaSeleccionada = id;

  //Traigo los productos por venta
  let productosPorVenta = ventas.find(
    (venta) => venta.id === idVentaSeleccionada
  ).productos;

  //Los cargo
  productosPorVenta.map(
    (producto) =>
      (cuerpoTablaProducto.innerHTML += `
  <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>
        <button onClick="handleEliminarProducto('${producto.id}')" class="btn btnAcciones" type="button"><i class="fa-solid fa-delete-left"></i></button>
        </td>
    </tr>
  `)
  );
};

flechaDerecha.addEventListener("click", () => {
  const valores = mostrarMas(mayorVenta, menorVenta);

  mayorVenta = valores.mayor;
  menorVenta = valores.menor;
  flechaDerechaClickeada = valores.flechaDerechaClickeada;

  console.log(valores);

  traerVentas();
});

flechaIzquierda.addEventListener("click", () => {
  const valores = mostrarMenos(
    mayorVenta,
    menorVenta,
    permitirRestarContador,
    contadorPaginaVenta
  );

  mayorVenta = valores.mayor;
  menorVenta = valores.menor;
  permitirEditar = valores.permitirRestarContador;
  contadorPaginaVenta = valores.contador;

  traerVentas();
});


traerVentas()

//Agregar eventos
document.getElementById("irCajero").addEventListener("click", mostrarCajero);
