//Funcion para cuando clickee el boton de cerrar caja
const cerrarCaja = async () => {
  //Guardo todos los valores de los inputs multiplicados por su respectivo valor del billete
  const cantidad10Mil = document.getElementById("input10mil").value * 10000;

  const cantidadMil = document.getElementById("inputMil").value * 1000;

  const cantidadQuinientos =
    document.getElementById("inputQuinientos").value * 500;

  const cantidadCien = document.getElementById("inputCien").value * 100;

  const cantidadCincuenta =
    document.getElementById("inputCincuenta").value * 50;

  const cantidadVeinte = document.getElementById("inputVeinte").value * 20;

  const cantidadDiez = document.getElementById("inputDiez").value * 10;

  //Los sumo
  const suma = parseInt(
    cantidad10Mil +
      cantidadMil +
      cantidadQuinientos +
      cantidadCien +
      cantidadCincuenta +
      cantidadVeinte +
      cantidadDiez
  );

  //Booleano para que si es true valide
  let cierreDeCajaValidado = false;

  //Validacion
  if (suma < totalFinal) {
    alert("Ingrese valores validos");
    cierreDeCajaValidado = false;
  } else if (suma === totalFinal || parseInt(totalFinal) + 10 > suma) {
    cierreDeCajaValidado = true;
  } else {
    alert("Ingrese valores validos");
    cierreDeCajaValidado = false;
  }


  //Si es true cargo todas las ventas
  if (cierreDeCajaValidado) {

    const productos = [];

    const resProductos = await axios(URLPRODUCTOS);

    //Guardo cada producto de las ventas en un array
    listaVentas.forEach((venta) => {
      for (let i = 0; i < listaVentas.length; i++) {
        productos.push(venta.productos[i].id)
      }
    })

    //Por cada producto que vendo le resto uno en su base de datos
    for (let i = 0; i < productos.length; i++) {
    try {
      //Busco el producto con su id
      let productoEncontrado = resProductos.data.find((producto) => producto.id === productos[i])
      
      //Le resto 1
      productoEncontrado.cantidad -= 1;

      //Lo actualizo en la base de datos de productos
      const resActualizar = await axios.patch(`${URLPRODUCTOS}/${productos[i]}`,productoEncontrado) 

      console.log(resActualizar.status);
    } catch (error) {
      console.log(error);
      
    }}

    //For para cargar todas las ventas en la base de datos de ventas
    for (let i = 0; i < listaVentas.length; i++) {
      try {
        const res = await axios.post(URLVENTAS, listaVentas[i]);
        console.log(res.status);
      } catch (error) {
        console.log(error);
      }
    }

    localStorage.removeItem("carrito")

  }
};

//Agrego los eventos
document
  .getElementById("formularioCerrarCaja")
  .addEventListener("submit", cerrarCaja);
