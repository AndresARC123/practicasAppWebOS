// Definimos la URL de la API oficial de Dragon Ball
const urlApi = "https://dragonball-api.com/api/characters";

const cargarPersonajes = () => {
  // Usamos fetch para hacer la petición HTTP
  fetch(urlApi)
    .then((respuesta) => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
    .then((data) => {
      // La API devuelve un objeto con una propiedad 'items' que contiene el array
      const personajes = data.items;
      mostrarPersonajes(personajes);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("No se pudo conectar con la API.");
    });
};

// Función encargada de manipular el DOM
const mostrarPersonajes = (personajes) => {
  const contenedor = document.getElementById("contenedor-personajes");
  contenedor.innerHTML = "";

  personajes.forEach((personaje) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("practice-card");

    // Usamos Template Strings (``) para inyectar el HTML interno con los datos
    tarjeta.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}" style="width: 100%; height: 250px; object-fit: contain;">
            <h3 class="practice-title">${personaje.name}</h3>
            <p class="practice-description">${personaje.description}</p>
            <div style="text-align: left; font-size: 0.85rem;">
                <p><strong>Ki:</strong> ${personaje.ki}</p>
                <p><strong>Raza:</strong> ${personaje.race}</p>
                <p><strong>Género:</strong> ${personaje.gender}</p>
            </div>
        `;
    contenedor.appendChild(tarjeta);
  });
};
