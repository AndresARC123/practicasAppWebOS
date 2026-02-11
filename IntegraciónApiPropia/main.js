const urlApi =
  "https://api.allorigins.win/raw?url=https://prestamosequipos.grupoahost.com/api/cata.php";

const cargarInventario = () => {
  fetch(urlApi)
    .then((respuesta) => respuesta.json())
    .then((res) => {
      mostrarEquipos(res);
    })
    .catch((error) => {
      alert("Error al conectar con la API");
      console.log(error);
    });
};

const mostrarEquipos = (equipos) => {
  const contenedor = document.getElementById("contenedor-inventario");
  contenedor.innerHTML = "";

  equipos.forEach((equipo) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("inventory-card");

    const imagenUrl = "https://loremflickr.com/400/250/computer";

    tarjeta.innerHTML = `
      <div class="card-image-container">
        <img src="${imagenUrl}" alt="equipo" class="card-img">
      </div>
      <div class="card-content">
        <h3 class="card-title">${equipo.nombre}</h3>
        <p class="card-description">${equipo.descripcion}</p>
        <p class="${equipo.cantidad > 0 ? "status-ok" : "status-none"}">
          Disponibles: ${equipo.cantidad}
        </p>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
};
