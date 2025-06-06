const inputEditarNombre = document.getElementById("inputEditarNombre")

const inputEditarEmpresa = document.getElementById("inputEditarEmpresa")

const inputEditarTelefono = document.getElementById("inputEditarTelefono")

const inputEditarEmail = document.getElementById("inputEditarEmail")

let productosDistribuidor = []

//Funcion para editar los distribuidores
const handleEditar = async (id) => {
  document.getElementById("formDistribuidorSinProductos").style.display =
    "none";
  document.getElementById("formAgregarProductos").style.display = "none";
  document.getElementById("formEditarDistribuidores").style.display =
    "block";


  const res = await axios(URLDISTRIBUIDORES);

  //Encuentro el distribuidor cone l id
  const distribuidorEncontrado = res.data.find(
    (distribuidor) => distribuidor.id === id
  );

  idDistribuidorSeleccionado = id

  productosDistribuidor = distribuidorEncontrado.productos

  //Seteo los valores en los inputs
  inputEditarNombre.value = distribuidorEncontrado.nombre;
  inputEditarEmpresa.value = distribuidorEncontrado.empresa;
  inputEditarTelefono.value = distribuidorEncontrado.telefono;
  inputEditarEmail.value = distribuidorEncontrado.email;
};

const editarDistribuidor = async (e) => {
    e.preventDefault()

  const validacion = () => {
    //Validar nombre
    if (inputEditarNombre.value === "") {
      console.log("Nombre invalido");
      validadoNombre = false;
      inputEditarNombre.classList.add("is-invalid");
    } else {
      console.log("Nombre validado");
      validadoNombre = true;
      inputEditarNombre.classList.remove("is-invalid");
    }

    //Validar Empresa
    if (inputEditarEmpresa.value === "") {
      console.log("Empresa invalida");
      validadoEmpresa = false;
      inputEditarEmpresa.classList.add("is-invalid");
    } else {
      console.log("Empresa validadad");
      validadoEmpresa = true;
      inputEditarEmpresa.classList.remove("is-invalid");
    }

    //Validar Telefono
    if (inputEditarTelefono.value === "") {
      console.log("Telefono invalido");
      validadoTelefono = false;
      inputEditarTelefono.classList.add("is-invalid");
    } else {
      console.log("Telefono validado");
      validadoTelefono = true;
      inputEditarTelefono.classList.remove("is-invalid");
    }

    //Validar Email
    if (inputEditarEmail.value === "") {
      console.log("Email invalido");
      validadoEmail = false;
      inputEditarEmail.classList.add("is-invalid");
    } else {
      console.log("Email validado");
      validadoEmail = true;
      inputEditarEmail.classList.remove("is-invalid");
    }
  };

  validacion();

  //Si esta todo valido hago
  if (validadoNombre && validadoEmpresa && validadoTelefono && validadoEmail) {
    const distribuidor = {
      nombre: inputEditarNombre.value,
      empresa: inputEditarEmpresa.value,
      telefono: inputEditarTelefono.value,
      email: inputEditarEmail.value,
      productos: productosDistribuidor,
    };

    try {
        const res = await axios.patch(`${URLDISTRIBUIDORES}/${idDistribuidorSeleccionado}`,distribuidor)

        console.log(res.statuts);
        
    } catch (error) {
        console.log(error);
        
    }
  }
};

document.getElementById("formEditarDistribuidores"),
  addEventListener("submit", editarDistribuidor);
