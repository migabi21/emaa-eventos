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

            if (typeof toggleSection === 'function') {
                toggleSection('Cotiza');
            }

            document
                .getElementById('confirmacionCotiza')
                ?.classList.remove('oculto');
        });
    }

    const confirmacionCotiza = document.getElementById('confirmacionCotiza');
    const cerrarConfirmacion = document.getElementById('cerrarConfirmacion');

    if (cerrarConfirmacion && confirmacionCotiza) {
        cerrarConfirmacion.addEventListener('click', () => {
            confirmacionCotiza.classList.add('oculto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        confirmacionCotiza.addEventListener('click', event => {
            if (event.target === confirmacionCotiza) {
                confirmacionCotiza.classList.add('oculto');
            }
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
                LOGIN
----------------------------------------------*/

document
    .querySelectorAll('[data-action="open-login"]')
    .forEach(button => {

        if (typeof openLoginModal === "function") {

            button.addEventListener(
                'click',
                openLoginModal
            );

        }

    });

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