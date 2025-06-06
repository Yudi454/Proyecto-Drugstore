let carrucel = 0;

const mostrar = ()=> {
  const contenedor = document.querySelectorAll('.cont_interno');
  contenedor.forEach(cont => cont.style.display = 'none');
  contenedor[carrucel].style.display = 'flex';
}

const siguiente = () => {
  const contenedor = document.querySelectorAll('.cont_interno');
  carrucel = (carrucel + 1) % contenedor.length;
  mostrar();
}

const anterior = () => {
  const contenedor = document.querySelectorAll('.cont_interno');
  carrucel = (carrucel - 1 + contenedor.length) % contenedor.length;
  mostrar();
}


mostrar();

document.getElementById("flechaDerecha").addEventListener("click",siguiente);

document.getElementById("flechaIzquierda").addEventListener("click",anterior)