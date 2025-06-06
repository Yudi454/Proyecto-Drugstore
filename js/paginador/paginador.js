//Funcion para la flecha derecha y mostrar los siguientes elementos
const mostrarMas = (mayor,menor) => {
  //Sirve para detectar de forma literal si el boton fue tocado
  const flechaDerechaClickeada = true;

  //Valido que si es la primera vez que lo toco y hay mas valores me mustre los 10 siguientes ej [11....20]
  if (menor == 0 && mayor != 0) {
    menor = 11;
    mayor += 11;
    //Si no en vez de sumarle 11 le sumo 10 porque ya no hace falta ese 1 ej [21....20]
  } else {
    menor += 10;
    mayor += 10;
  }

  return valores = {
    mayor: mayor,
    menor: menor,
    flechaDerechaClickeada: flechaDerechaClickeada
  }
};

//Funcion para la flecha izquiera y mostrar los elementos anteriores
const mostrarMenos = (mayor,menor,permitirRestarContador,contador) => {

  //Si estoy en la siguiente pagina a la principal le resto 11 ej 11 - 11 = 0, osea la primera posicion del array
  if (menor == 11 && mayor == 21) {
    menor -= 11;
    mayor -= 11;
    //Si no le le resto simplemente 10 porqu ese 1 no me afecta, ej 21-10 = 11
  } else {
    menor -= 10;
    mayor -= 10;
  }

  //Si el permitir restar esta true, permite restar
  if (permitirRestarContador) {
    contador -= 10;
  } else {
    //Le doy true al final para que no funcione cuando se llegue al limite
    permitirRestarContador = true;
  }

  return valores = {
    mayor: mayor,
    menor: menor,
    permitirRestarContador: permitirRestarContador,
    contador: contador
  }
};

