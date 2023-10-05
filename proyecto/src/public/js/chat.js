const socket = io(); // Conexión al servidor WebSocket

// Función para mostrar un mensaje en el chat
function mostrarMensaje(usuario, mensaje) {
    const chatMessages = document.querySelector(".chat-messages");
    const mensajeElement = document.createElement("div");
    mensajeElement.classList.add("mensaje");
    mensajeElement.innerHTML = `<strong>${usuario}:</strong> ${mensaje}`;
    chatMessages.appendChild(mensajeElement);
}

// Captura el formulario de envío de mensajes
const messageForm = document.querySelector(".chat-input");
const sendMsg = document.getElementById("sendMsg"); // Agregamos esta línea

// Manejar el envío de un mensaje
sendMsg.addEventListener("click", () => {
    const userInput = document.querySelector("#userInput").value;
    const messageInput = document.querySelector("#messageInput").value;

    // Verifica que userInput y messageInput no estén vacíos
    if (userInput.trim() === "" || messageInput.trim() === "") {
        alert("Por favor, ingrese un nombre de usuario y un mensaje.");
        return;
    }

    // Enviar el mensaje al servidor a través de Socket.io
socket.emit("enviarMensaje", { usuario: userInput, mensaje: messageInput });

// Limpiar el campo de mensaje
document.querySelector("#messageInput").value = "";

});





