/*==================================================
                INICIALIZACIÓN
==================================================*/

/**
 * Punto de entrada principal de EMAA.
 *
 * Se encarga de conectar:
 * - Productos
 * - Carrito
 * - Login
 * - Buscador
 * - Carrusel
 * - Centro de ayuda
 */

/*==================================================
                CONFIGURACIÓN DE LA PÁGINA
==================================================*/

function setupPage() {

    document
        .querySelectorAll('[data-action="toggle-section"]')
        .forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;
                if (targetId && typeof toggleSection === 'function') {
                    toggleSection(targetId);
                }
            });
        });

    const cotizaForm = document.querySelector('.formulario-cotiza');

    if (cotizaForm) {
        cotizaForm.addEventListener('submit', event => {
            event.preventDefault();

            const value = id => document.getElementById(id)?.value.trim() || '';
            const rawDate = value('cotizaFecha');
            const eventDate = rawDate
                ? new Date(`${rawDate}T00:00:00`).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                : '';

            const message = [
                '¡Hola, equipo EMAA! Espero que se encuentren muy bien. Quisiera solicitar una cotización para mi evento:',
                '',
                `Nombre: ${value('cotizaNombre')}`,
                `Celular: ${value('cotizaCelular')}`,
                `Correo: ${value('cotizaCorreo')}`,
                `Tipo de evento: ${value('cotizaEvento')}`,
                `Fecha: ${eventDate}`,
                `Número de invitados: ${value('cotizaPersonas')}`,
                `Descripción: ${value('cotizaInformacion') || 'Sin información adicional'}`,
                '',
                'Quedo pendiente de tu respuesta. ¡Muchas gracias por la atención!'
            ].join('\n');

            const whatsappUrl = `https://wa.me/573246501091?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            window.location.assign('index.html#inicio');
        });
    }
    /*----------------------------------------------
                CARRITO
----------------------------------------------*/

const cartButton = document.getElementById('cartBtn');

    if (cartButton) {
    cartButton.addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });
}

    /*----------------------------------------------
                    PRODUCTOS
    ----------------------------------------------*/

    document
        .querySelectorAll('.Producto button')
        .forEach(button => {

            button.dataset.originalText = button.textContent;

            button.addEventListener('click', () => {

                const productElement =
                    button.closest('.Producto');

                if (!productElement) return;

                addToCart(productElement);

                button.textContent = 'Agregado';

                setTimeout(() => {

                    button.textContent =
                        button.dataset.originalText;

                }, 900);

            });

        });


    /*----------------------------------------------
                    BUSCADOR
    ----------------------------------------------*/

    const buscador =
        document.getElementById('buscador');

    const btnBuscar =
        document.getElementById('btnBuscar');

    const searchForm =
        document.getElementById('searchForm');


    if (buscador) {

        buscador.addEventListener(
            'keyup',
            filtrarProductos
        );

    }


    if (btnBuscar) {

        btnBuscar.addEventListener('click', () => {

            filtrarProductos();

            buscador?.focus();

        });

    }


    if (searchForm) {

        searchForm.addEventListener(
            'submit',
            event => {

                event.preventDefault();

                filtrarProductos();

                buscador?.focus();

            }
        );

    }


    /*----------------------------------------------
                    LOGOUT
    ----------------------------------------------*/

    const logoutBtn =
        document.getElementById('logoutBtn');

    if (logoutBtn) {

        logoutBtn.addEventListener('click', () => {

            localStorage.removeItem('emaaLoggedUser');

            renderUserSession();

        });

    }

}


/*==================================================
                INICIALIZACIÓN
==================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupPage();

       if (typeof setupCarousel === "function") {
        setupCarousel();
    }

        loadCart();

        if (typeof renderUserSession === "function") {
        renderUserSession();
    }


        /*------------------------------------------
                    CENTRO DE AYUDA
        ------------------------------------------*/

        const params =
            new URLSearchParams(
                window.location.search
            );

        if (params.get("view") === "ayuda") {

            openHelpView();

        }


        /*------------------------------------------
                    PREGUNTAS
        ------------------------------------------*/

        if (typeof activarPreguntas === "function") {

            activarPreguntas();

        }

    }
);
