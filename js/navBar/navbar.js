// Prevenimos que alguien no reguistrado ingrese
if (localStorage.getItem("usuario") == null) {
  window.location.href = "../../index.html";
}

const botonCerrarSesion = document.getElementById("cerrarSesion");

// Añade un evento click al botón
botonCerrarSesion.addEventListener("click", () => {
  const confirmacion = confirm("¿Seguro que deseas cerrar sesión?");
  if (confirmacion) {
    // Aquí puedes limpiar datos de sesión (si usas localStorage, cookies, etc.)
    localStorage.removeItem("usuario"); // Ejemplo: limpiar almacenamiento local
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "../../index.html"; // Cambia la ruta según tu estructura
  }
});

const cargarCuerpoCarrito = () => {
  if (localStorage.getItem("carrito")) {
    console.log(JSON.parse(localStorage.getItem("carrito")));

    const productos = JSON.parse(localStorage.getItem("carrito"));

    productos.forEach((producto) => {
      document.getElementById("cuerpoCarrito").innerHTML += /* HTML */ `
        <article class="sectProducto">
          <figure class="fotoPrducto col-6">
            <img class="img-fluid" src="${producto.imagen}" alt="" />
          </figure>
          <section class="productInfo col-6">
            <h2>${producto.nombre}</h2>
            <p><strong>Categoría:</strong>${producto.categoria}</p>
            <p><strong>Cantidad:</strong>${producto.cantidad}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
          </section>
        </article>
      `;
    });
  }
};

cargarCuerpoCarrito();
