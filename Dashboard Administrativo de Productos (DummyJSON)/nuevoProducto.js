const catSelect = document.getElementById("categorySelect");
const productForm = document.getElementById("productForm");
const messageDiv = document.getElementById("message");

cargarCategorias();

function cargarCategorias() {
  fetch("https://dummyjson.com/products/category-list")
    .then((res) => res.json())
    .then((categorias) => {
      categorias.forEach((c) => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        catSelect.appendChild(option);
      });
    });
}

productForm.onsubmit = (e) => {
  e.preventDefault();

  const datos = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
    category: catSelect.value,
  };

  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => res.json())
    .then((data) => {
      messageDiv.textContent =
        'Producto "' + data.title + '" creado con éxito (ID: ' + data.id + ")";
      messageDiv.className = "message success";
      messageDiv.style.display = "block";
      productForm.reset();
    })
    .catch(() => {
      messageDiv.textContent = "Error al conectar con el servidor";
      messageDiv.className = "message error";
      messageDiv.style.display = "block";
    });
};
