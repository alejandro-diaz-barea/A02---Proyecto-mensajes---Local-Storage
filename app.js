// Selectores
const boton = document.querySelector(".button.u-full-width.button-primary");
const listaMensajes = document.querySelector("#lista-mensajes");
const mensajeInput = document.querySelector("#mensaje");

// variables
let mensajes = [];

// Listeners
document.addEventListener("DOMContentLoaded", () => {
    cargarMensajesGuardados();
    boton.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarMensaje();
    });
    listaMensajes.addEventListener("click", (e) => {
        if (e.target.classList.contains("boton-eliminar")) {
            const index = e.target.dataset.index;
            eliminarMensaje(index);
        }
    });
});

// Almacenar en localStorage
function guardarMensajes() {
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
}

// cargar mensajes del localStorage
function cargarMensajesGuardados() {
    const mensajesGuardados = localStorage.getItem("mensajes");
    if (mensajesGuardados) {
        mensajes = JSON.parse(mensajesGuardados);
        mostrarMensajesGuardados();
    }
}

// Mostrar mensajes guardados
function mostrarMensajesGuardados() {
    listaMensajes.innerHTML = "";

    mensajes.forEach((mensaje, index) => {
        agregarMensajeConBoton(mensaje, index);
    });
}

// Función para mostrar un nuevo mensaje
function mostrarMensaje() {
    const mensaje = mensajeInput.value;
    if (mensaje.trim() !== "") {
        agregarMensajeConBoton(mensaje, mensajes.length);
        mensajes.push(mensaje);
        guardarMensajes();
        mensajeInput.value = "";
    }
}

// Función para agregar un mensaje con el botón de eliminar
function agregarMensajeConBoton(mensaje, index) {
    const mensajeHTML = document.createElement("p");
    mensajeHTML.textContent = mensaje;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "X";
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.dataset.index = index;

    mensajeHTML.appendChild(botonEliminar);
    listaMensajes.appendChild(mensajeHTML);
}

function eliminarMensaje(index) {
    mensajes.splice(index, 1);
    guardarMensajes();
    mostrarMensajesGuardados();
}
