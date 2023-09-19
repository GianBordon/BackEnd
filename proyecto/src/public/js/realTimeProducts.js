// Cliente WebSocket
const socket = io();

//elementos
const productList = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");


// Enviamos info del formulario al socket del servidor
createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    jsonData.price = parseInt(jsonData.price);
    jsonData.stock = parseInt(jsonData.stock);

    // Realizar la validación de datos aquí
    if (!validateProduct(jsonData)) {
        // Mostrar un mensaje de error o realizar acciones de manejo de errores
        return;
    }

    // Emitir un evento WebSocket para agregar un producto
    socket.emit("addProduct", jsonData);

    // Limpiar el formulario después de enviar
    createProductForm.reset();
});

// Función para validar un producto
function validateProduct(product) {
    // Realiza la validación aquí
    if (!product.title || !product.description || !product.code || isNaN(product.price) || isNaN(product.stock) || !product.category) {
        // Si la validación falla, muestra un mensaje de error y devuelve false
        alert("Por favor, complete todos los campos del producto y asegúrese de que el precio y el stock sean números válidos.");
        return false;
    }

    // Si la validación es exitosa, devuelve true
    return true;
}

//recibimos los productos
socket.on("productsArray", (dataProducts)=>{
    console.log(dataProducts);
    let productsElms="";
    dataProducts.forEach(product=>{
        productsElms +=
        `<li>
            <p>Nombre: ${product.title}</p><button onclick="deleteProduct(${product.id})">Eliminar</button>

        </li>`
    });
    productList.innerHTML=productsElms;
});

const deleteProduct = (productId)=>{
    socket.emit("deleteProduct", productId);
};

