//Url distribuidores
const URLDISTRIBUIDORES = "http://localhost:3000/Distribuidores";

//Url de productos
const URLPRODUCTOS = "http://localhost:3000/productos";

//Guardo los inputs para no llamarlo muchas veces

const inputNombre = document.getElementById("inputNombre");

const inputEmpresa = document.getElementById("inputEmpresa");

const inputTelefeno = document.getElementById("inputTelefono");

const inputEmail = document.getElementById("inputEmai");

const inputNombreProducto = document.getElementById("inputNombreProducto");

const inputCategoriaProducto = document.getElementById(
  "inputCategoriaProducto"
);

const inputPrecioProducto = document.getElementById("inputPrecioProducto");

const inputFotoProducto = document.getElementById("inputFotoProducto");

const tablaDistribuidores = document.getElementById(
  "cuerpoTablaDistribuidores"
);


//Booleanos para validar
let validadoNombre = false;

let validadoEmpresa = false;

let validadoTelefono = false;

let validadoEmail = false;

//Valor menor que sirve para el slice
let menorDistribuidor = 0;
//Valor mayor que sirve para el slice
let mayorDistribuidor = 0;
//Sirve para contar la cantidad total de elementos que mostramos
let contadorPaginaDistribuidor = 0;
//Valida literalmente si la flecha derecha fue clickeada
let flechaDerechaClickeada = false;
//Permite restar cuando se clickea la flecha izquierda, empieza en true, para que cuando se llegue al limite de elementos
//Se bloquee este y no reste de mas, ej si tenemos 15 elementos, se bloquea asi solo se reste 5 y no 15
let permitirRestarContador = true;

let idDistribuidorSeleccionado = "";

//Funcion para que cuando se abra el modal muestre los inputs de productos
//Mirar es un booleano que habilita la funcion de agregar productos o mirar
const handleAgregarProducto = (id,mirar) => {
  document.getElementById("formDistribuidorSinProductos").style.display =
    "none";
    document.getElementById("formEditarDistribuidores").style.display = "none";
  document.getElementById("formAgregarProductos").style.display = "block";
  
  //Si es true solo deja mirar
  if (mirar) {
    mirarProductos(id)
  } else {
    //Si no habilita los inputs y el boton para agregar
    document.getElementById("inputNombreProducto").disabled = false

    document.getElementById("inputCategoriaProducto").disabled = false;

    document.getElementById("inputPrecioProducto").disabled = false;

    document.getElementById("inputFotoProducto").disabled = false;

    document.getElementById("botonAgregarProductos").style.display = "block"
    
  }
};

//Funcion para mostrar el form de distribuidores
const mostrarFormDistribuidores = () => {
  document.getElementById("formDistribuidorSinProductos").style.display =
    "block";
  document.getElementById("formAgregarProductos").style.display = "none";
  document.getElementById("formEditarDistribuidores").style.display = "none";
};

//Funcion para crear un distribuidor sin productos
const crearDistribuidorSinProductos = async (e) => {
  e.preventDefault();

  //Validar nombre
  if (inputNombre.value === "") {
    console.log("Nombre invalido");
    validadoNombre = false;
    inputNombre.classList.add("is-invalid");
  } else {
    console.log("Nombre validado");
    validadoNombre = true;
    inputNombre.classList.remove("is-invalid");
  }

  //Validar Empresa
  if (inputEmpresa.value === "") {
    console.log("Empresa invalida");
    validadoEmpresa = false;
    inputEmpresa.classList.add("is-invalid");
  } else {
    console.log("Empresa validadad");
    validadoEmpresa = true;
    inputEmpresa.classList.remove("is-invalid");
  }

  //Validar Telefono
  if (inputTelefeno.value === "") {
    console.log("Telefono invalido");
    validadoTelefono = false;
    inputTelefeno.classList.add("is-invalid");
  } else {
    console.log("Telefono validado");
    validadoTelefono = true;
    inputTelefeno.classList.remove("is-invalid");
  }

  //Validar Email
  if (inputEmail.value === "") {
    console.log("Email invalido");
    validadoEmail = false;
    inputEmail.classList.add("is-invalid");
  } else {
    console.log("Email validado");
    validadoEmail = true;
    inputEmail.classList.remove("is-invalid");
  }

  //Si esta todo valido hago
  if (validadoNombre && validadoEmpresa && validadoTelefono && validadoEmail) {
    const distribuidor = {
      id: "",
      nombre: inputNombre.value,
      empresa: inputEmpresa.value,
      telefono: inputTelefeno.value,
      email: inputEmail.value,
      productos: [],
    };

    try {
      const res = await axios.post(URLDISTRIBUIDORES, distribuidor);

      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  }
};

//Funcion para crear los productos para cada distribuidor
const crearProductoParaDistribuidor = (e) => {
  e.preventDefault();

  const inputNombreProducto = document.getElementById("inputNombreProducto");

  const inputCategoriaProducto = document.getElementById(
    "inputCategoriaProducto"
  );

  const inputPrecioProducto = document.getElementById("inputPrecioProducto");

  const inputFotoProducto = document.getElementById("inputFotoProducto");

  let validadoNombre = false;

  let validadoCategoria = false;

  let validadoPrecio = false;

  let validadoFoto = false;

  const validarInputsProductos = () => {
    //Validacion de nombre
    if (inputNombreProducto.value === "") {
      console.log("Nombre invalido");
      inputNombreProducto.classList.add("is-invalid");
    } else {
      console.log("Nombre valido");
      validadoNombre = true;
      inputNombreProducto.classList.remove("is-invalid");
    }

    //Validacion de la categoria
    if (inputCategoriaProducto.value === "") {
      console.log("Categoria invalido");
      inputCategoriaProducto.classList.add("is-invalid");
    } else {
      console.log("Categoria valido");
      validadoCategoria = true;
      inputCategoriaProducto.classList.remove("is-invalid");
    }

    //Validacion del precio
    if (inputPrecioProducto.value === "") {
      console.log("Precio invalido");
      inputPrecioProducto.classList.add("is-invalid");
    } else {
      console.log("Preco valido");
      validadoPrecio = true;
      inputPrecioProducto.classList.remove("is-invalid");
    }

    //Validacon de la foto
    if (inputFotoProducto.value === "") {
      console.log("Foto invalida");
      inputFotoProducto.classList.add("is-invalid");
    } else {
      console.log("Foto valida");
      validadoFoto = true;
      inputFotoProducto.classList.remove("is-invalid");
    }
  };

  const agregarProducto = async () => {

    try {
      //Creo un id y lo guardo
      const idRandom = parseInt((Math.random() * 9000 ) +1000);

      const producto = {
        id : idRandom.toString(),
        nombre: inputNombreProducto.value,
        categoria: inputCategoriaProducto.value,
        cantidad: 0,
        precio: inputPrecioProducto.value,
        foto: inputFotoProducto.value,
      };

      const res = await axios(URLDISTRIBUIDORES);

      const distribuidores = await res.data;

      //Encuentro al distribuidor para agregarle los id de los productos
      distribuidorEncontrado = distribuidores.find(
        (distribuidor) => distribuidor.id === idDistribuidorSeleccionado
      );

      distribuidorEncontrado.productos.push({
        id: idRandom.toString()
      });

      //Lo actualizo con los nuevos productos
      const res2 = await axios.patch(
        `${URLDISTRIBUIDORES}/${idDistribuidorSeleccionado}`,
        distribuidorEncontrado
      );

      //Creo el producto en la base de datos de productos con cantidad 0
      const resProductos = await axios.post(URLPRODUCTOS,producto)

    } catch (error) {}
  };

  validarInputsProductos();

  //Si esta todo valido hago agregar producto
  if (
    validadoNombre &&
    validadoCategoria &&
    validadoPrecio &&
    validadoFoto
  ) {
    agregarProducto();
  }
};
//Fin de la funcion de crear porductos para los distribuidores

//Funcion para traer los productos cuando hago click en un distribuidor
const traerProductos = async (id) => {
  document.getElementById("cuerpoTablaProductos").innerHTML = "";

  idDistribuidorSeleccionado = id

  const productosEcontrados = []
  
  const res = await axios(URLDISTRIBUIDORES);

  const resProductos = await axios(URLPRODUCTOS)

  //Traigo los id de los productos de los distribuidores
  const distribuidorEncontrado = res.data.find(
    (distribuidor) => distribuidor.id === id
  );

  //Busco los productos con los id
  distribuidorEncontrado.productos.forEach((producto) =>{
    const productoEncontrado = resProductos.data.find((productoEncontrado) => productoEncontrado.id === producto.id )

    productosEcontrados.push(productoEncontrado)
    
  })

  //Los muestro
  productosEcontrados.map(
    (producto) =>
      (document.getElementById("cuerpoTablaProductos").innerHTML += /* HTML */ `
        <tr>
          <td scope="row">${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.precio}</td>
          <td>
            <button
              onClick="handleAgregarProducto('${producto.id}',true)"
              class="btn btnAcciones"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalDistribuidores"
            >
              <i class="fa-solid fa-eye"></i>
            </button>
            <button
              onClick="handleDeleteProducto('${producto.id}')"
              class=" btn btnAcciones"
              type="button"
            >
              <i class="fa-solid fa-delete-left"></i>
            </button>
          </td>
        </tr>
      `)
  );
};

//Funcion para traer todos los distribuidores
const traerDistribuidores = async () => {
  tablaDistribuidores.innerHTML = "";

  //Para que mayor distribuidor empieze en 0
  if (mayorDistribuidor === 0) {
    mayorDistribuidor = 10
  }

  const res = await axios(URLDISTRIBUIDORES);

  //Array donde guardare los 10 productos
  let distribuidoresPorPagina = [];

  //Con slice corto el string para traer los primeros 10, siguientes, anteriores valores
  distribuidoresPorPagina = res.data.slice(menorDistribuidor, mayorDistribuidor);

  //Si es la primera vez que abre la pagina y por lo tanto el valor es 0, voy sumando a ese contador
  //La cantidad de ventas que estoy agarrando de la cantidad total, que en este caso es de 10 en 10
  if (contadorPaginaDistribuidor == 0 || flechaDerechaClickeada) {
    contadorPaginaDistribuidor += distribuidoresPorPagina.length;
    flechaDerechaClickeada = false;
  }

  //Si estoy en los primeros 10 valores no muestro el boton para retroceder
  //Los valores representan las posiciones de los elementos en el array para el slice
  if (menorDistribuidor == 0 && mayorDistribuidor == 10) {
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
    res.data[contadorPaginaDistribuidor + 1] == undefined ||
    mayorDistribuidor - res.data.length == 0
  ) {
    //Bloqueo el permitir restar para que solo reste el segundo digito
    permitirRestarContador = false;
    flechaDerecha.style.display = "none";
    contadorPaginaDistribuidor -= contadorPaginaDistribuidor % 10;

    //Si no muestro el boton
  } else {
    flechaDerecha.style.display = "block";
  }

  distribuidoresPorPagina.map(
    (distribuidor) =>
      (tablaDistribuidores.innerHTML += /* HTML */ `
        <tr onClick="traerProductos('${distribuidor.id}')">
          <td scope="row">${distribuidor.id}</td>
          <td>${distribuidor.nombre}</td>
          <td>${distribuidor.empresa}</td>
          <td>${distribuidor.telefono}</td>
          <td>${distribuidor.email}</td>
          <td>
            <button
              onClick="handleAgregarProducto('${distribuidor.id}',false)"
              class=" btn btnAcciones"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalDistribuidores"
            >
              <i class="fa-solid fa-boxes-stacked"></i>
            </button>
            <button
              onClick="handleEditar('${distribuidor.id}')"
              class="btn btnAcciones"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalDistribuidores"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick="handleDelete('${distribuidor.id}')"
              class=" btn btnAcciones"
              type="button"
            >
              <i class="fa-solid fa-delete-left"></i>
            </button>
          </td>
        </tr>
        
      `)
  );
};

traerDistribuidores();

//Funcion para la flecha de la derecha en el paginador
flechaDerecha.addEventListener("click", () => {

  const valores = mostrarMas(mayorDistribuidor,menorDistribuidor)
  
  mayorDistribuidor = valores.mayor
  menorDistribuidor = valores.menor
  flechaDerechaClickeada = valores.flechaDerechaClickeada;
  
  traerDistribuidores();
});

//Funcion para la flecha de la izquierda en el paginador
flechaIzquierda.addEventListener("click", () => {
  const valores = mostrarMenos(mayorDistribuidor,menorDistribuidor,permitirRestarContador,contadorPaginaDistribuidor);

  mayorDistribuidor = valores.mayor;
  menorDistribuidor = valores.menor;
  permitirRestarContador = valores.permitirRestarContador;
  contadorPaginaDistribuidor = valores.contador;

  prueba();
});

document
  .getElementById("formDistribuidorSinProductos")
  .addEventListener("submit", crearDistribuidorSinProductos);

document
  .getElementById("formAgregarProductos")
  .addEventListener("submit", crearProductoParaDistribuidor);

document
  .getElementById("botonAgregarDistribuidores")
  .addEventListener("click", mostrarFormDistribuidores);
