

const editarUsuario = async (e) => {
    e.preventDefault()

  //Guardo los valores de los inputs
  let usuario = document.getElementById("userEditar").value 
  let contraseña = document.getElementById("passEditar").value 
  let direccion = document.getElementById("directionEditar").value 
  let telefono = document.getElementById("phoneEditar").value 
  let email = document.getElementById("emailEditar").value 
  let fNacimiento = document.getElementById("nacimientoEditar").value 
  let rol = document.getElementById("rolEditar").value

  //Los valido
  validarEdicion()

  //Si son validos hago
  if (
    validadoUsuario &&
    validadoContraseña &&
    validadoDireccion &&
    validadoTelefono &&
    validadoEmail &&
    validadoFechaDeNacimiento && validadoRol
  ) {

    try {
      let response = await axios.patch(URLUSUARIOS + idUsuarioSeleccionado, {
        usuario,
        contraseña,
        direccion,
        telefono,
        email,
        fNacimiento,
        rol
      });

      validadoUsuario = false;
      validadoContraseña = false;
      validadoDireccion = false;
      validadoTelefono = false;
      validadoEmail = false;
      validadoFechaDeNacimiento = false;
      
      alert("Usuario actualizado correctamente");
      
    } catch (error) {
      console.log(error);
    }
  }

}

//Funcion para validar al editar
const validarEdicion = () => {

    let usuario = document.getElementById("userEditar")
    let contraseña = document.getElementById("passEditar")
    let direccion = document.getElementById("directionEditar")
    let telefono = document.getElementById("phoneEditar")
    let email = document.getElementById("emailEditar")
    let fNacimiento = document.getElementById("nacimientoEditar")
    let rol = document.getElementById("rolEditar")
  
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
    } else{
      rol.classList.remove("is-invalid");
      validadoRol = true;
    }
  };



document.getElementById("formEditar").addEventListener("submit", editarUsuario);
