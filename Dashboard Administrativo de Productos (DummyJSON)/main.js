let skip = 0;
const limit = 10;
let total = 0;

const tableBody = document.getElementById("tableBody");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");

cargarCategorias();
cargarProductos();

function cargarCategorias() {
  fetch("https://dummyjson.com/products/category-list")
    .then((res) => res.json())
    .then((categorias) => {
      categorias.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
      });
    });
}

function cargarProductos() {
  let url = "https://dummyjson.com/products?limit=" + limit + "&skip=" + skip;

  const texto = searchInput.value;
  const categoria = categoryFilter.value;
  const orden = sortFilter.value.split("-");

  if (texto) {
    url =
      "https://dummyjson.com/products/search?q=" +
      texto +
      "&limit=" +
      limit +
      "&skip=" +
      skip;
  } else if (categoria) {
    url =
      "https://dummyjson.com/products/category/" +
      categoria +
      "?limit=" +
      limit +
      "&skip=" +
      skip;
  }

  url += "&sortBy=" + orden[0] + "&order=" + orden[1];

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      total = data.total;
      mostrarTabla(data.products);
      actualizarUI();
    });
}

function mostrarTabla(lista) {
  tableBody.innerHTML = "";

  lista.forEach((p) => {
    const fila = document.createElement("tr");
    fila.id = "row-" + p.id;

    fila.innerHTML = `
      <td>${p.id}</td>
      <td><img src="${p.thumbnail}" width="40"></td>
      <td>${p.title}</td>
      <td>$${p.price}</td>
      <td><strong>${p.stock}</strong></td>
      <td>${p.category}</td>
      <td>
        <button onclick="editarProducto(${p.id})">Editar</button>
        <button onclick="borrarProducto(${p.id})">Borrar</button>
      </td>
    `;

    tableBody.appendChild(fila);
  });
}

function actualizarUI() {
  document.getElementById("pageInfo").textContent =
    "Página " + (skip / limit + 1) + " de " + (Math.ceil(total / limit) || 1);

  document.getElementById("btnPrev").disabled = skip === 0;
  document.getElementById("btnNext").disabled = skip + limit >= total;
}

function editarProducto(id) {
  window.location.href = "editar.html?id=" + id;
}

function borrarProducto(id) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    fetch("https://dummyjson.com/products/" + id, {
      method: "DELETE",
    }).then(() => {
      document.getElementById("row-" + id).style.opacity = "0.3";
      alert("Producto eliminado visualmente");
    });
  }
}

document.getElementById("btnNext").onclick = () => {
  skip += limit;
  cargarProductos();
};

document.getElementById("btnPrev").onclick = () => {
  skip -= limit;
  cargarProductos();
};

categoryFilter.onchange = () => {
  skip = 0;
  cargarProductos();
};

sortFilter.onchange = () => {
  cargarProductos();
};

searchInput.onkeypress = (e) => {
  if (e.key === "Enter") {
    skip = 0;
    cargarProductos();
  }
};
