
//Funcion para mostrar la tabla y ocultar lo demas
const mostrarTabla = () => {
    window.location.href = "../tabla/tablaVentas.html"
  };

  //Funcion para mostrar el cajero y ocultar lo demas
const mostrarCajero = () => {
    window.location.href = "../cajero/cajero.html"
  };

document.getElementById("tabla").addEventListener("click", mostrarTabla);

document.getElementById("cajero").addEventListener("click", mostrarCajero);
