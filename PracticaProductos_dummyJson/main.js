const productosDiv = document.getElementById("productos");
const detalleDiv = document.getElementById("detalle");
const detalleContenido = document.querySelector(".detalle-contenido");
const btnVolver = document.getElementById("volver");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");

cargarProductos();

function cargarProductos() {
  fetch("https://dummyjson.com/products?limit=12")
    .then((res) => res.json())
    .then((data) => {
      mostrarProductos(data.products);
    });
}

function mostrarProductos(lista) {
  productosDiv.innerHTML = "";

  if (lista.length === 0) {
    productosDiv.innerHTML = "<p>No se encontraron productos</p>";
    return;
  }

  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${producto.title}</h3>
      <img src="${producto.thumbnail}">
      <p>Precio: $${producto.price}</p>
      <p>Categoría: ${producto.category}</p>
      <p>Rating: ${producto.rating}</p>
    `;

    card.onclick = () => {
      cargarDetalle(producto.id);
    };

    productosDiv.appendChild(card);
  });
}

function cargarDetalle(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((producto) => {
      productosDiv.classList.add("oculto");
      detalleDiv.classList.remove("oculto");

      detalleContenido.innerHTML = `
        <h2>${producto.title}</h2>
        <img src="${producto.thumbnail}">
        <p>${producto.description}</p>
        <p>Precio: $${producto.price}</p>
        <p>Marca: ${producto.brand}</p>
        <p>Categoría: ${producto.category}</p>
      `;
    });
}

btnVolver.onclick = () => {
  detalleDiv.classList.add("oculto");
  productosDiv.classList.remove("oculto");
};

btnBuscar.onclick = () => {
  buscarProductos(inputBuscar.value);
};

inputBuscar.onkeydown = (e) => {
  if (e.key === "Enter") {
    buscarProductos(inputBuscar.value);
  }
};

function buscarProductos(texto) {
  if (texto.trim() === "") {
    cargarProductos();
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${texto}&limit=12`)
    .then((res) => res.json())
    .then((data) => {
      mostrarProductos(data.products);
    });
}
