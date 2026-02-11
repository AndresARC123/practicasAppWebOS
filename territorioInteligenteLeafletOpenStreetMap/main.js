let latitud = 20.92743;
let longitud = -98.292476;

const ubicacion = [latitud, longitud];
const map = L.map("map").setView(ubicacion, 20);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marcador = L.marker(ubicacion).addTo(map);
marcador
  .bindPopup(
    "<b>Estoy aquí</b><br>Latitud: " + latitud + "<br>Longitud: " + longitud,
  )
  .openPopup();

let casa = L.polygon([
  [20.9273173, -98.2924247],
  [20.927539, -98.292377],
  [20.927582, -98.292529],
  [20.927362, -98.292589],
]).addTo(map);

casa.on("click", () => {
  casa
    .bindPopup(
      "<b>Mi Casa</b><br>Este es el terreno que abarca mi casa",
      "<br>Nuevo Acatepec Xochiatipan",
    )
    .openPopup();
});
