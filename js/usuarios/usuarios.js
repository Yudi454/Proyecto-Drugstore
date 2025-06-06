//Guardo url de usuarios
const URLUSUARIOS = "http://localhost:3000/usuarios/";

//Si no estoy logueado me manda a loguearme
if (localStorage.getItem("usuario") === null) {
  window.location.href = "../../index.html";
}

//Guardo el usuario logueado del local storage
let usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));


//Booleanos para validar
let validadoUsuario = false;
let validadoContraseña = false;
let validadoDireccion = false;
let validadoTelefono = false;
let validadoEmail = false;
let validadoFechaDeNacimiento = false;
let validadoRol = false;

//Valor menor que sirve para el slice
let menorUsuario = 0;
//Valor mayor que sirve para el slice
let mayorUsuario = 0;
//Sirve para contar la cantidad total de elementos que mostramos
let contadorPaginaUsuario = 0;
//Valida literalmente si la flecha derecha fue clickeada
let flechaDerechaClickeada = false;
//Permite restar cuando se clickea la flecha izquierda, empieza en true, para que cuando se llegue al limite de elementos
//Se bloquee este y no reste de mas, ej si tenemos 15 elementos, se bloquea asi solo se reste 5 y no 15
let permitirRestarContador = true;

//Guardo el id del usuario que seleccione
let idUsuarioSeleccionado = "";

//Funcion para borrar
const handleDelete = async (id) => {
  try {
    let response = await axios.delete(URLUSUARIOS + id);

    alert("Usuario eliminado correctamente");
  } catch (error) {
    console.log("error");
  }
};

//Funcion para mostrar el formulario de agreegar
const handleClick = () => {
  document
    .getElementById("contenedorFormularioAgregar")
    .classList.remove("d-none");
  document.getElementById("contenedorFormularioEditar").classList.add("d-none");
  document.getElementById("agregar").classList.add("d-none");
};

//Funcion para agregar un usuario
const handleAgregar = async (e) => {
  e.preventDefault();

  //Guardo los valores de los inputs
  let usuario = document.getElementById("user").value;
  let contraseña = document.getElementById("pass").value;
  let direccion = document.getElementById("direction").value;
  let telefono = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let fNacimiento = document.getElementById("nacimiento").value;
  let rol = document.getElementById("rol").value;

  //Los valido
  validar();

  //Si estan validos hago
  if (
    validadoUsuario &&
    validadoContraseña &&
    validadoDireccion &&
    validadoTelefono &&
    validadoEmail &&
    validadoFechaDeNacimiento &&
    validadoRol
  ) {
    try {
      let response = await axios.post(URLUSUARIOS, {
        id: "",
        usuario,
        contraseña,
        direccion,
        telefono,
        email,
        fNacimiento,
        rol,
      });

      //Los booleanos para validar los hago false para reiniciarlos
      validadoUsuario = false;
      validadoContraseña = false;
      validadoDireccion = false;
      validadoTelefono = false;
      validadoEmail = false;
      validadoFechaDeNacimiento = false;

      alert("Usuario agregado correctamente");
    } catch (error) {
      console.log(error);
    }
  }
};

//Funcion para validar el usuario a crear
const validar = () => {
  let usuario = document.getElementById("user");
  let contraseña = document.getElementById("pass");
  let direccion = document.getElementById("direction");
  let telefono = document.getElementById("phone");
  let email = document.getElementById("email");
  let fNacimiento = document.getElementById("nacimiento");
  let rol = document.getElementById("rol");

  //Validar usuario
  if (usuario.value === "") {
    usuario.classList.add("is-invalid");
  } else {
    usuario.classList.remove("is-invalid");
    validadoUsuario = true;
  }

  //Validar contraseña
  if (contraseña.value === "") {
    contraseña.classList.add("is-invalid");
  } else {
    contraseña.classList.remove("is-invalid");
    validadoContraseña = true;
  }

  //Validar direccion
  if (direccion.value === "") {
    direccion.classList.add("is-invalid");
  } else {
    direccion.classList.remove("is-invalid");
    validadoDireccion = true;
  }

  //Validar telefono
  if (telefono.value === "") {
    telefono.classList.add("is-invalid");
  } else {
    telefono.classList.remove("is-invalid");
    validadoTelefono = true;
  }

  //Validar email
  if (email.value === "") {
    email.classList.add("is-invalid");
  } else {
    email.classList.remove("is-invalid");
    validadoEmail = true;
  }

  //Validar fecha de nacimiento
  if (fNacimiento.value === "") {
    fNacimiento.classList.add("is-invalid");
  } else {
    fNacimiento.classList.remove("is-invalid");
    validadoFechaDeNacimiento = true;
  }

  //Validar rol
  if (rol.value === "") {
    rol.classList.add("is-invalid");
  } else {
    rol.classList.remove("is-invalid");
    validadoRol = true;
  }
};

//Funcion para mostrar el formulario de editar y setear los valores
const handleEdit = (
  e,
  id,
  usuario,
  contraseña,
  direccion,
  telefono,
  email,
  fNacimiento,
  rol
) => {
  e.preventDefault();

  document
    .getElementById("contenedorFormularioAgregar")
    .classList.add("d-none");
  document
    .getElementById("contenedorFormularioEditar")
    .classList.remove("d-none");
  document.getElementById("agregar").classList.remove("d-none");

  document.getElementById("userEditar").value = usuario;
  document.getElementById("passEditar").value = contraseña;
  document.getElementById("directionEditar").value = direccion;
  document.getElementById("phoneEditar").value = telefono;
  document.getElementById("emailEditar").value = email;
  document.getElementById("nacimientoEditar").value = fNacimiento;
  document.getElementById("rolEditar").value = rol;

  //Guardo el valor del id que seleccione
  idUsuarioSeleccionado = id;
};

//Funcion para traer todos los usuarios
const getUsuarios = async () => {
  try {
    if (mayorUsuario === 0) {
      mayorUsuario = 10;
    }

    let response = await axios.get(URLUSUARIOS);

    //Array donde guardare los 10 productos
    let usuariosPorPagina = [];

    //Con slice corto el string para traer los primeros 10, siguientes, anteriores valores
    usuariosPorPagina = response.data.slice(menorUsuario, mayorUsuario);

    //Si es la primera vez que abre la pagina y por lo tanto el valor es 0, voy sumando a ese contador
    //La cantidad de ventas que estoy agarrando de la cantidad total, que en este caso es de 10 en 10
    if (contadorPaginaUsuario == 0 || flechaDerechaClickeada) {
      contadorPaginaUsuario += usuariosPorPagina.length;
      flechaDerechaClickeada = false;
    }

    //Si estoy en los primeros 10 valores no muestro el boton para retroceder
    //Los valores representan las posiciones de los elementos en el array para el slice
    if (menorUsuario == 0 && mayorUsuario == 10) {
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
      response.data[contadorPaginaUsuario + 1] == undefined ||
      mayorUsuario - response.data.length == 0
    ) {
      //Bloqueo el permitir restar para que solo reste el segundo digito
      permitirRestarContador = false;
      flechaDerecha.style.display = "none";
      contadorPaginaUsuario -= contadorPaginaUsuario % 10;

      //Si no muestro el boton
    } else {
      flechaDerecha.style.display = "block";
    }

    usuariosPorPagina.map(
      (usuario) =>
        (document.getElementById("cuerpoTabla").innerHTML += /* HTML */ `
          <tr>
            <th scope="col">${usuario.id}</th>
            <th scope="col">${usuario.usuario}</th>
            <th scope="col">${usuarioLogueado.rol === "Admin" ? usuario.contraseña : "******"}</th>
            <th scope="col">${usuario.direccion}</th>
            <th scope="col">${usuario.telefono}</th>
            <th scope="col">${usuario.email}</th>
            <th scope="col">${usuario.fNacimiento}</th>
            <th scopé="col">${usuario.rol}</th>
            <th scope="col" class="${usuarioLogueado.rol !== "Admin" ? "d-none" : ""} d-flex" id=columnaAcciones>
              <button
                class="btn btnAcciones"
                onClick="handleDelete
                (${usuario.id})"
              >
                <i class="fa-solid fa-delete-left"></i>
              </button>
              <button
                class="btn btnAcciones"
                onClick="handleEdit(event,'${usuario.id}', '${usuario.usuario}', '${usuario.contraseña}', '${usuario.direccion}', '${usuario.telefono}', '${usuario.email}', '${usuario.fNacimiento}','${usuario.rol}')"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </th>
          </tr>
        `)
    );

    //Si el usuario es admin muestro los botones
    if (usuarioLogueado.rol === "Admin") {
      console.log("usted es admin");

    }
  } catch (error) {
    console.log("error");
  }

  //si podes ponerle los iconos que usaste lucas a los botones
};

//Mustro los usuarios cuando se carg la pagina
getUsuarios();

//Agrego eventos
document
  .getElementById("formAgregar")
  .addEventListener("submit", handleAgregar);

document.getElementById("agregar").addEventListener("click", handleClick);
