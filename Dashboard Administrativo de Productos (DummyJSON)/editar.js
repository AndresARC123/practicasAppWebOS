const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const catSelect = document.getElementById("categorySelect");
const messageDiv = document.getElementById("message");

if (!productId) {
  window.location.href = "index.html";
}

document.getElementById("productIdDisplay").textContent = "#" + productId;

cargarCategorias();
cargarProducto();

function cargarCategorias() {
  fetch("https://dummyjson.com/products/category-list")
    .then((res) => res.json())
    .then((categorias) => {
      categorias.forEach((c) => {
        const opcion = document.createElement("option");
        opcion.value = c;
        opcion.textContent = c;
        catSelect.appendChild(opcion);
      });
    });
}

function cargarProducto() {
  fetch("https://dummyjson.com/products/" + productId)
    .then((res) => res.json())
    .then((producto) => {
      titleInput.value = producto.title;
      priceInput.value = producto.price;
      stockInput.value = producto.stock;
      catSelect.value = producto.category;
    });
}

document.getElementById("editForm").onsubmit = (e) => {
  e.preventDefault();

  const datos = {
    title: titleInput.value,
    price: priceInput.value,
    stock: stockInput.value,
    category: catSelect.value,
  };

  fetch("https://dummyjson.com/products/" + productId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      if (res.ok) {
        messageDiv.textContent = "Cambios guardados con éxito";
        messageDiv.className = "message success";
        messageDiv.style.display = "block";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      }
    })
    .catch(() => {
      messageDiv.textContent = "Error al actualizar el producto";
      messageDiv.className = "message error";
      messageDiv.style.display = "block";
    });
};
