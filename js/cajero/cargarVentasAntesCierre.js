//Guardo todos los productos antes de guardarlos en ventas.productos[]
let listaProductos = [];

//Guardo el producto para despues enviarlos a lista productos
let productoAAgregar = "";

//Guardo todos las ventas listadas
let listaVentas = [];

//Donde se guardara el total final de todas las ventas
let totalFinal = 0;

const URLVENTAS = "http://localhost:3000/Ventas";

const URLPRODUCTOS = "http://localhost:3000/productos";

//Guardo todos los input
const fecha = document.getElementById("inputFechaCrearVenta");
const total = document.getElementById("inputTotalCrearVenta");
const descuento = document.getElementById("inputDescuentoCrearVenta");
const metodoDePago = document.getElementById("metodoDePagoCrearVenta");
const producto = document.getElementById("agregarProductosCrearVenta");

const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

//Seteo el vendedor que luego vendra con el login
document.getElementById("idVendedor").value = usuarioLogueado.id;

document.getElementById("nombreVendedor").value = usuarioLogueado.usuario;

let idVendedor = document.getElementById("idVendedor").value;

//Funcion para mostrar la tabla y ocultar lo demas
const mostrarTabla = () => {
  window.location.href = "../tabla/tablaVentas.html";
};

if (localStorage.getItem("carrito")) {
  listaProductos = JSON.parse(localStorage.getItem("carrito"));

  listaProductos.map(
    (producto) =>
      //Lo muestro en una tabla
      (document.getElementById("listaProductoVender").innerHTML += `
  <th scope="row">${producto.nombre}</th>
`)
  );

  console.log(listaProductos);
}

//Funcion para cargar los productos en el input
const cargarInputAgregarPorductos = async () => {
  //Vacio el input
  document.getElementById("agregarProductosCrearVenta").innerHTML = "";

  try {
    //Traigo los productos de db.json
    const res = await axios(URLPRODUCTOS);

    productos = await res.data;

    //Creo la opcion sin valor de elegir
    document.getElementById("agregarProductosCrearVenta").innerHTML = `
        <option selected value="">Elegir</option>
        `;
    //Agrego todos los otros productos con sus valores
    productos.map(
      (producto) =>
        (document.getElementById("agregarProductosCrearVenta").innerHTML += `
            <option value="${producto.nombre}">${producto.nombre}</option>
            `)
    );
  } catch (error) {
    console.log(error);
  }
};

//Funcion para listar los productos que seran agregados a venta.productos
const listarProductosVender = () => {
  //Guardo el nombre del producto
  const producto = document.getElementById("agregarProductosCrearVenta").value;

  //Valido que se eliga un producto antes de listarlo
  if (producto === "" && productos === "") {
    alert("Eliga un producto antes");
  } else {
    console.log(productos);

    //Encuentro el producto con el nombre
    const productoEncontrado = productos.find(
      (Producto) => Producto.nombre === producto
    );

    console.log(productoEncontrado);

    console.log(listaProductos);

    //Lo muestro en una tabla
    document.getElementById("listaProductoVender").innerHTML += `
            <th scope="row">${productoEncontrado.nombre}</th>
        `;
    //Traigo el input de total
    const total = document.getElementById("inputTotalCrearVenta");

    //Traigo el input de descuento
    const descuento = document.getElementById("inputDescuentoCrearVenta");

    //Si el total esta vacio le agrego 0
    if (total.value === "") {
      total.value = 0;
    }

    //Guardo el total sin el descuento
    const totalSinDescuento =
      parseInt(total.value) + parseInt(productoEncontrado.precio);

    //Le agrego el descuento
    const totalConDescuento =
      totalSinDescuento -
      (parseInt(totalSinDescuento) * parseInt(descuento.value)) / 100;

    //Le doy el valor al input del total ya con el descuento
    total.value = totalConDescuento;

    productoEncontrado.precio = total.value;

    //Lo guardo en el array
    listaProductos.push(productoEncontrado);

    localStorage.setItem("carrito", JSON.stringify(listaProductos));
  }
};

//Limpiar imput
const limpiarImputsCajero = () => {
  fecha.value = "";
  total.value = "";
  descuento.value = "";
  metodoDePago.value = "";
  producto.selectedIndex = 0;
};

//Funcion para agregar las ventas a la lista
const agregarListaVentas = () => {
  //Booleanos para que si es true las agregue
  let validadoFecha = false;
  let validadoTotal = false;
  let validadoProductos = false;
  let validadoDescuento = false;
  let validadoMetodoDePago = false;

  //Funcion de validacion
  const validarAntesAgregar = () => {
    //Validacion de fecha
    if (fecha.value === "") {
      console.log("fecha no valida");
      fecha.classList.add("is-invalid");
      validadoFecha = false;
    } else {
      console.log("fecha valida");
      fecha.classList.remove("is-invalid");
      validadoFecha = true;
    }

    //Validacion de total
    if (total.value === "") {
      console.log("Total no valido");
      total.classList.add("is-invalid");
      validadoTotal = false;
    } else {
      console.log("total valido");
      total.classList.remove("is-invalid");
      validadoTotal = true;
    }

    //Validacion descuento
    if (descuento.value === "" || descuento.value < 0 || descuento.value > 99) {
      console.log("Descuento no validado");
      descuento.classList.add("is-invalid");
      validadoDescuento = false;
    } else {
      console.log("Descuento validado");
      document.getElementById(("agregarListaProductoVender")).disabled = false
      descuento.classList.remove("is-invalid");
      validadoDescuento = true;
    }

    //Validacion metodo de pago
    if (metodoDePago.value === "") {
      console.log("Metodo no valido");
      metodoDePago.classList.add("is-invalid");
      validadoMetodoDePago = false;
    } else {
      console.log("Metodo valido");
      metodoDePago.classList.remove("is-invalid");
      validadoMetodoDePago = true;
    }

    //Validacion lista de productos
    if (listaProductos == "") {
      console.log("Agregar producto no valido");
      producto.classList.add("is-invalid");
      validadoProductos = false;
    } else {
      console.log("Agregar producto valido");
      producto.classList.remove("is-invalid");
      validadoProductos = true;
    }
  };

  //Llamo validar
  validarAntesAgregar();

  //Si todo esta true guardo
  if (
    validadoFecha === true &&
    validadoTotal === true &&
    validadoProductos === true &&
    validadoDescuento === true &&
    validadoMetodoDePago === true
  ) {
    //Guardo todos los valores de los input en venta

    const idRandom = parseInt(Math.random() * 9000 + 1000);

    let acumulador = 0;

    listaProductos.forEach((producto) => 
      acumulador += parseInt(producto.precio)
    );

    const venta = {
      id: idRandom.toString(),
      fecha: fecha.value,
      total: acumulador,
      vendedor: usuarioLogueado.id,
      productos: listaProductos,
      descuento: descuento.value,
      metodoDePago: metodoDePago.value,
    };

    //La guardo en el array
    listaVentas.push(venta);

    console.log(venta);
    
    document.getElementById("agregarListaProductoVender").disabled = true

    //Vacio lista de productos
    listaProductos = [];

    //Limpio el input
    limpiarImputsCajero();

    //Vacio la tabla de la lista de productos
    document.getElementById("listaProductoVender").innerHTML = "";

    //Habilito el boton de cerrar caja
    document.getElementById("botonCerrarCaja").disabled = false;

    //Al total final le sumo todos los totales de la venta
    totalFinal = 0;

    listaVentas.forEach((venta) =>
      console.log((totalFinal += parseInt(venta.total)))
    );

    //Le pongo el valor al input del total final
    document.getElementById("inputTotalFinal").value = totalFinal;

    //Traigo la lista de ventas para mostrar las nuevas ventas
    traerListaVentas();
  }
};

//Funcion para borrar las ventas de la lista
const handleDeleteListaVenta = (vendedor) => {
  console.log("funciono delete lista venta");

  //Encuentro la venta seleccionada
  const ventaEncontrada = listaVentas.find(
    (venta) => venta.vendedor === vendedor
  );

  //La quito del array
  listaVentas.splice(ventaEncontrada, 1);

  console.log(listaVentas);

  //Traigo la lista de venta para mostrar nuevos valores
  traerListaVentas();
};

//Funcion para traer todas las ventas y mostrarlas
const traerListaVentas = () => {
  //Vacio la tabla
  document.getElementById("listaVentasCajero").innerHTML = "";
  
  //Agrego elementos a la tabla
  listaVentas.forEach(
    (venta) =>
      (
        
        document.getElementById("listaVentasCajero").innerHTML += `
        <tr>
            <td>${venta.vendedor}</td>
            <td>${venta.total}</td>
            <td><button onClick="handleDeleteListaVenta('${venta.vendedor}')" class="btn btnAcciones" type="button"><i class="fa-solid fa-delete-left"></i></button></td>
        </tr>
        `)
  );
};

cargarInputAgregarPorductos();

//Agrego los eventos
document
  .getElementById("agregarListaProductoVender")
  .addEventListener("click", listarProductosVender);

document
  .getElementById("agregarListaVentas")
  .addEventListener("click", agregarListaVentas);

document.getElementById("irTabla").addEventListener("click", mostrarTabla);
