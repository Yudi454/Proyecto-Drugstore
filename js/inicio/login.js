if (localStorage.getItem("usuario") !== null) {
    window.location.href = "../../html/menuAdmin/admin-menu.html"
}

//creo la funcion donde al hacer click en el login puedo verificar si el usuario esta registrado o no 
const login = async (e) => {
    e.preventDefault()

    //Guardo los valores
    let usuario = document.getElementById("user").value
    let password = document.getElementById("pass").value

    //Validar usuario
    if (usuario !== "") {
        validadoUsuario = true;
    }

    //Validar constraseña
    if (password !== "") {
        validadoPassword = true;
    }

    //Si es valido hacer
    if (usuario && password) {
        try {
            let response = await axios.get(URLUSUARIOS)
    
            //Encontrar el usuario para despues cargarlo en el localStorage
            let usuarioEncontrado = response.data.find((user) => user.usuario === usuario && user.contraseña === password)

            console.log(usuarioEncontrado);
            
    
            //si el usuario esta en mi json se ingresa a la pagina, si no esta sale una alerta de usuario no encontrado
            if (usuarioEncontrado !== undefined) {
                const usuarioACargar = {
                    id: usuarioEncontrado.id,
                    usuario: usuarioEncontrado.usuario,
                    email: usuarioEncontrado.email,
                    rol: usuarioEncontrado.rol
                }

                //Limpiar los imputs
                limpiarInputsLogin()
                //Guardar en el local storage
                localStorage.setItem("usuario", JSON.stringify(usuarioACargar) )
                window.location.href ="../../html/menuAdmin/admin-menu.html"
                alert("BIENVENIDO")
            } else {
                alert("Usuario no encontrado")
            }
    
        } catch (error) {
    
            console.error(error);
        }
    } else {
        alert("Ingrese datos")
    }

}

//Mostrar el registro
const mostrarRegistro = () => {
    console.log("funciona mostrarRegistro");
    document.getElementById("articleRegistro").classList = ""
    document.getElementById("articleRegistro").style.display = "block";
    document.getElementById("articleLogin").style.display = "none";
}

//Funcion para limpiar los inputs
const limpiarInputsLogin = () => {
    document.getElementById("user").value = ""
    document.getElementById("pass").value = ""
}

//Agregar Eventos
document.getElementById("formLogin").addEventListener("submit", login)

document.getElementById("botonIrRegistro").addEventListener("click",mostrarRegistro)