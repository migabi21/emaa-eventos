/*==================================================
=               CENTRO DE AYUDA
==================================================*/

/**
 * Muestra el contenido de la categoría seleccionada
 * dentro del Centro de Ayuda.
 *
 * @param {string} categoria Nombre de la categoría.
 */

/**
 * Activa el comportamiento de las preguntas frecuentes
 * (FAQ) para mostrar u ocultar sus respuestas.
 */

let categoriaActiva = null;

function mostrarCategoria(categoria){

    const contenido = document.getElementById("contenidoCategoria");
    const seccion = document.querySelector(".contenido-ayuda");

    if (categoriaActiva === categoria && seccion.style.display === "block") {
        seccion.style.display = "none";
        contenido.innerHTML = "";
        categoriaActiva = null;
        return;
    }

    seccion.style.display = "block";
    categoriaActiva = categoria;

    const contenidos = {
        comprar: {
            titulo: "¿Cómo comprar?",
            preguntas: [
                ["¿Cómo hago un pedido?", "Explora Productos, elige una opción y pulsa Agregar al carrito. Luego revisa los productos, las cantidades y el total en Mi carrito."],
                ["¿Cómo finalizo mi compra?", "Desde Mi carrito puedes seleccionar Finalizar compra. El proyecto registra el pedido y, si tienes una cuenta, calcula los puntos correspondientes."],
                ["¿Puedo pagar por WhatsApp?", "Sí. Selecciona Pagar por WhatsApp en el carrito. EMAA abrirá una conversación con el detalle del pedido, las cantidades y el total para continuar la atención."],
                ["¿Cómo solicito una cotización?", "Usa la opción Cotiza tu evento y completa nombre, celular, correo, tipo de evento, cantidad de personas, fecha e información adicional."],
                ["¿Puedo personalizar una tabla?", "Sí. Las tablas y pasabocas pueden adaptarse a celebraciones, eventos y necesidades especiales. Para una propuesta personalizada, solicita una cotización."]
            ]
        },
        pagos: {
            titulo: "Métodos de pago",
            preguntas: [
                ["¿Qué opción de pago ofrece el proyecto?", "El flujo implementado permite continuar el pedido por WhatsApp mediante el botón Pagar por WhatsApp del carrito."],
                ["¿Cómo envío mi pedido por WhatsApp?", "Agrega los productos al carrito, revisa el total y pulsa Pagar por WhatsApp. Se abrirá una conversación con el resumen del pedido."],
                ["¿EMAA recibe pagos directamente en la página?", "Actualmente la página no tiene una pasarela de pago integrada. La confirmación del medio de pago se coordina con el equipo por WhatsApp."],
                ["¿Cómo confirmo el valor de mi pedido?", "El carrito muestra el precio de cada producto, las cantidades y el total antes de enviarlo por WhatsApp."]
            ]
        },
        entregas: {
            titulo: "Tiempos de entrega",
            preguntas: [
                ["¿Cuánto tarda mi pedido?", "El proyecto no establece un tiempo fijo de entrega. El plazo debe confirmarse con EMAA según el producto, la cantidad, la fecha del evento y la disponibilidad."],
                ["¿Cómo coordino la entrega?", "Envía el pedido por WhatsApp y confirma con el equipo la fecha, la hora y los datos necesarios para la entrega."],
                ["¿Puedo pedir para un evento?", "Sí. Para eventos conviene usar Cotiza tu evento e indicar la fecha, el número de personas y la información adicional."],
                ["¿Dónde consulto el horario de atención?", "El horario publicado por EMAA es de lunes a viernes de 9:00 a.m. a 5:00 p.m. y sábados de 8:00 a.m. a 12:00 m."]
            ]
        },
        garantias: {
            titulo: "Garantías y cambios",
            preguntas: [
                ["¿Qué hago si tengo un inconveniente con mi pedido?", "Comunícate con EMAA por WhatsApp, teléfono o correo y describe lo ocurrido con los datos del pedido."],
                ["¿Qué información debo enviar?", "Indica tu nombre, el detalle del pedido, la fecha de entrega y una descripción clara del inconveniente. Si es necesario, adjunta fotografías por WhatsApp."],
                ["¿Cómo se revisan los cambios o garantías?", "El proyecto no publica una política específica de cambios o garantías. El equipo revisará cada caso y te indicará la solución correspondiente."],
                ["¿Puedo reportar un problema por WhatsApp?", "Sí. WhatsApp es el canal disponible para continuar la atención y revisar el pedido directamente con EMAA."]
            ]
        }
    };

    const categoriaSeleccionada = contenidos[categoria];
    if (!categoriaSeleccionada) return;

    contenido.innerHTML = `
        <h2>${categoriaSeleccionada.titulo}</h2>
        <div class="faq">
            ${categoriaSeleccionada.preguntas.map(([pregunta, respuesta]) => `
                <button class="pregunta" type="button">► ${pregunta}</button>
                <div class="respuesta"><p>${respuesta}</p></div>
            `).join("")}
        </div>
    `;

    seccion.classList.toggle("contenido-comprar", categoria === "comprar");

    activarPreguntas();
}

function activarPreguntas(){
    const preguntas = document.querySelectorAll(".pregunta");
    preguntas.forEach((pregunta)=>{

       pregunta.addEventListener("click",()=>{

    const respuesta = pregunta.nextElementSibling;

    respuesta.classList.toggle("mostrar");

    if(respuesta.classList.contains("mostrar")){

        pregunta.innerHTML="▼ "+pregunta.textContent.replace("► ","").replace("▼ ","");

    }else{

        pregunta.innerHTML="► "+pregunta.textContent.replace("► ","").replace("▼ ","");

    }
    });
});
}