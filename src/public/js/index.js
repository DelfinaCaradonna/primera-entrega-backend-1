const socket = io();

const form = document.getElementById("productForm");
const deleteButton = document.getElementsByClassName("productForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    title: document.querySelector("#productTitle").value,
    description: document.querySelector("#productDescription").value,
    code: document.querySelector("#productCode").value,
    price: parseFloat(document.querySelector("#productPrice").value),
    stock: parseInt(document.querySelector("#productStock").value),
    category: document.querySelector("#productCategory").value,
    thumbnails: document.querySelector("#productThumbnails").value,
    status: true,
  };

  try {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: "El producto se agregó correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.fire("Error", msg, "error");
    console.error("Error al enviar el producto:", err);
  }

  form.reset();
});

document.getElementById("productsList").addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`/api/products/delete-product?id=${id}`, {
        method: "DELETE",
      });

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El producto fue eliminado.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", msg, "error");
      console.error("Error al eliminar:", err);
    }
  }
});

socket.on("productAdded", (product) => {
  const list = document.getElementById("productsList");
  const item = document.createElement("li");
  item.setAttribute("data-id", product.id);

  item.innerHTML = `
    <div>
        <h2>${product.title}</h2>
        <button class="delete-btn" data-id="${product.id}">
            🗑️
        </button>
    </div>
    <div class="productInfoContainer">
      <div class="productInfo">
        <p>${product.description}</p>
        <p><strong>Precio:</strong> $${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Categoria:</strong> ${product.category}</p>
      </div>
      <img src="/public/images/${product.thumbnails}" alt="${product.title}" width="100" />
    </div>
  `;

  list.appendChild(item);
});

socket.on("productDeleted", (id) => {
  const item = document.querySelector(`li[data-id="${id}"]`);
  if (item) item.remove();
});

//filtro y sorting

const getSelectedOption = (id, attribute) => {
  return (
    id &&
    attribute &&
    Object.values(document.getElementById(id)?.attributes).find(
      (att) => att.name === attribute
    ).value
  );
};

document.getElementById("categoryFilter").value = getSelectedOption(
  "categoryFilter",
  "selected-category"
);

document
  .getElementById("categoryFilter")
  ?.addEventListener("change", (event) => {
    const getQueryParams = () => {
      const params = new URLSearchParams(window.location.search);
      const query = {};
      for (const [key, value] of params.entries()) {
        query[key] = value;
      }
      return query;
    };
    const value = event.target.value !== "" ? event.target.value : undefined;
    const query = { ...getQueryParams(), category: value };
    if (!value) {
      delete query.category;
    }
    const urlQuery = new URLSearchParams(query);
    window.location.href = `/api/products?${urlQuery.toString()}`;
  });

document.getElementById("sort").value = getSelectedOption(
  "sort",
  "selected-sort"
);

document.getElementById("sort")?.addEventListener("change", (event) => {
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const query = {};
    for (const [key, value] of params.entries()) {
      query[key] = value;
    }
    return query;
  };
  const value = event.target.value !== "" ? event.target.value : undefined;
  const query = { ...getQueryParams(), sort: value };
  if (!value) {
    delete query.sort;
  }
  const urlQuery = new URLSearchParams(query);
  window.location.href = `/api/products?${urlQuery.toString()}`;
});
