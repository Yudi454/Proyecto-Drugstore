//Guardo el link de mi base de datos
const URLUSUARIOS = "http://localhost:3000/usuarios";

//Funcion para registrar
const registro = async (e) =>{
    e.preventDefault()

    //Guardo los valores
    let user = document.getElementById("userRegistro").value
    let password = document.getElementById("passRegistro").value
    let direccion = document.getElementById("direction").value
    let telefono = document.getElementById("phone").value
    let mail = document.getElementById("email").value
    let nacimiento = document.getElementById("nacimiento").value

    //Para verificar si esta todo validado
    let validadoUser = false;
    let validadoPassword = false;
    let validadoDireccion = false;
    let validadoTelefono = false;
    let validadoMail = false;
    let validadoNacimiento = false;

    //Validar usuario
    if (user === "") {
        document.getElementById("userRegistro").classList.add("is-invalid");
    } else{
        document.getElementById("userRegistro").classList.remove("is-invalid");
        validadoUser = true;
    }

    //Validar contraseña
    if (password === "") {
        document.getElementById("passRegistro").classList.add("is-invalid");
    } else{
        document.getElementById("passRegistro").classList.remove("is-invalid");
        validadoPassword= true;
    }

    //Validar direccion
    if (direccion === "") {
        document.getElementById("direction").classList.add("is-invalid");
    } else{
        document.getElementById("direction").classList.remove("is-invalid");
        validadoDireccion = true;
    }

    //Validar telefono
    if (telefono === "") {
        document.getElementById("phone").classList.add("is-invalid");
    } else{
        document.getElementById("phone").classList.remove("is-invalid");
        validadoTelefono = true;
    }

    //Validar email
    if (mail === "") {
        document.getElementById("email").classList.add("is-invalid");
    } else{
        document.getElementById("email").classList.remove("is-invalid");
        validadoMail = true;
    }

    //Validar fecha de nacimiento
    if (nacimiento === "") {
        document.getElementById("nacimiento").classList.add("is-invalid");
    } else{
        document.getElementById("nacimiento").classList.remove("is-invalid");
        validadoNacimiento = true;
    }

    //Si esta todo valido hago
    if (validadoUser && validadoPassword && validadoDireccion && validadoTelefono && validadoMail && validadoNacimiento) {
        try {
            //Hago la peticion
            let response = await axios.post(URLUSUARIOS,{
                id: "",
                usuario: user,
                contraseña:password,
                direccion: direccion,
                telefono: telefono,
                email: mail,
                fNacimiento: nacimiento,
                rol: "user"
            })
            
            alert("Pudiste crear correctamente la cuenta")
    
            //Limpio inputs
            limpiarInputsRegistro()
    
            //Muestro el login
            mostrarLogin()
    
        } catch (error) {
         console.log(error);
            
        }
    }

}

//Funcion para mostrar el login y esconder el registro
const mostrarLogin = () => {
    console.log("funciona mostrarRegistro");
    document.getElementById("articleRegistro").style.display = "none";
    document.getElementById("articleLogin").style.display = "block";
}

//Funcion para limpiar los inputs
const limpiarInputsRegistro = () =>{
    document.getElementById("user").value=""
    document.getElementById("pass").value=""
    document.getElementById("direction").value=""
    document.getElementById("phone").value=""
    document.getElementById("email").value=""
    document.getElementById("nacimiento").value=""

}

//Agrego eventos
document.getElementById("formRegistro").addEventListener("submit", registro)

document.getElementById("botonIrLogin").addEventListener("click",mostrarLogin)