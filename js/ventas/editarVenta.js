//Regex para fehca yyyy/MM/dd, despues cambiar si se usa el otro formato de fecha
const regexFecha = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;

//Regex para que el total tenga 12 numeros y 2 decimales
const regexTotal = /^(?!0\d)\d{1,7}(\.\d{1,2})?$/;

//Guardo los input
const fechaInput = document.getElementById("inputFecha");
const totalInput = document.getElementById("inputTotal");
const vendedorInput = document.getElementById("inputVendedor");
const descuentoInput = document.getElementById("inputDescuento");
const metodoDePagoInput = document.getElementById("metodoDePago");

//Logica que se realiza cuando clickeo el boton de editar
const logicaEdicion = async () => {

  //Traigolos valores de los input
  const fecha = fechaInput.value;

  const total = totalInput.value;

  const vendedor = vendedorInput.value;

  const descuento = descuentoInput.value;

  const metodoDePago = metodoDePagoInput.value;

  //Variables paravalidar si es que todo esta true
  let validadoFecha = false;
  let validadoTotal = false;
  let validadoVendedor = false;
  let validadoDescuento = false;
  let validadoMetodoDePago = false;

  //Funcion para validar los input
  const validar = async () => {
    //Validacion de fecha
    const fechaValida = (fecha) => {
      return regexFecha.test(fecha);
    };

    if (fecha === "" || !fechaValida(fecha)) {
      fechaInput.classList.add("is-invalid");
      validadoFecha = false;
    } else {
      fechaInput.classList.remove("is-invalid");
      validadoFecha = true;
    }

    //Validacion de total
    const totalValido = (total) => {
      return regexTotal.test(total);
    };

    if (total === "" || !totalValido(total)) {
      totalInput.classList.add("is-invalid");
      validadoTotal = false;
    } else {
      totalInput.classList.remove("is-invalid");
      validadoTotal = true;
    }

    //Validacion vendedor
    if (vendedor === "") {
      vendedorInput.classList.add("is-invalid");
      validadoVendedor = false;
    } else {
      vendedorInput.classList.remove("is-invalid");
      validadoVendedor = true;
    }

    if (descuento === "" || descuento < 0 || descuento > 99) {
      descuentoInput.classList.add("is-invalid");
      validadoDescuento = false;
    } else {
      descuentoInput.classList.remove("is-invalid");
      validadoDescuento = true;
    }

    //Validacion metodo de pago

    if (metodoDePago === "") {
      metodoDePagoInput.classList.add("is-invalid");
      validadoMetodoDePago = false;
    } else {
      metodoDePagoInput.classList.remove("is-invalid");
      validadoMetodoDePago = true;
    }
  };

  //Funcion para realizar la peticion de actualizacion
  const editar = async () => {

    //Guardo los valores antes de mandarlos
    const venta = {
      fecha: fecha,
      total: total,
      vendedor: vendedor,
      descuento: descuento,
      metodoDePago: metodoDePago,
    };

    //Peticion
    try {
      const res = await axios.patch(
        `${URLVENTAS}/${idVentaSeleccionada}`,
        venta
      );
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }

    //Traigo ventas para cargar los valores
    traerVentas();

    document.getElementById("formDistribuidorSinProductos").display = "none"
  };

  //LLamo validar
  validar();

  //Si todo esta true edito
  if (
    validadoDescuento &&
    validadoFecha &&
    validadoMetodoDePago &&
    validadoTotal &&
    validadoVendedor
  ) {

    editar();

  }
};

//Funcion para agregar los productos en la venta
const agregarProducto = async () => {
  //Guardo el nombre del producto del input
  const productoAAgregar = document.getElementById("agregarProductos").value;

  try {
   //Encuentro el producto con el nombre
    const productoEncontrado = productos.find(
      (producto) => producto.nombre === productoAAgregar
    );

    //Encuentro la venta 
    const ventaEncontrada = ventas.find(
      (venta) => venta.id === idVentaSeleccionada
    );

    //Guardo el producto en el array de productos de ventas
    ventaEncontrada.productos.push(productoEncontrado);

    //Actualizo la venta con el nuevo producto
    const resVentas = await axios.patch(
      `${URLVENTAS}/${idVentaSeleccionada}`,
      ventaEncontrada
    );

    alert("Producto agregado");
  } catch (error) {
    console.log(error);
  }
};

//Funcion para limpiar los input
const limpiarImputs = () => {
  fechaInput.value = ""
  totalInput.value = ""
  vendedorInput.value = ""
  descuentoInput.value = ""
  metodoDePagoInput.value = ""
}

//Agrego los eventos
document.getElementById("botonEditar").addEventListener("click", logicaEdicion);

document.getElementById("formularioVenta").addEventListener("submit", (e) => {
  e.preventDefault();
});

document
  .getElementById("botonAgregarProducto")
  .addEventListener("click", agregarProducto);
