/*==================================================
=               NAVEGACIÓN
==================================================*/

/**
 * Muestra u oculta una sección de la página.
 *
 * @param {string} targetId ID de la sección a mostrar.
 */
function toggleSection(targetId) {

    const secciones = [
        'Quienes-somos',
        'Servicios',
        'Productos',
        'Cotiza'
    ];

    const target = document.getElementById(targetId);

    if (!target) return;

    const yaVisible = !target.classList.contains('oculto');

    // Ocultar las secciones del menú
    secciones.forEach(id => {

        const seccion = document.getElementById(id);

        if (seccion) {
            seccion.classList.add('oculto');
            seccion.style.display = 'none';
        }

    });

    // Si ya estaba visible, simplemente la dejamos cerrada
    if (yaVisible) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        return;
    }

    // Mostrar la sección seleccionada
    target.classList.remove('oculto');
    target.style.display = 'block';

    // Dejar la sección debajo del header fijo, incluso si este cambia de altura.
    const header = document.querySelector('.navbar');
    const headerOffset = (header?.offsetHeight || 0) + 20;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
    });
}

function setupPage() {
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', event => {
            event.preventDefault();
            const params = new URLSearchParams(window.location.search);
            if (params.get('view') === 'ayuda') {
                window.history.replaceState({}, '', window.location.pathname);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('[data-action="toggle-section"]').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            if (targetId) {
                toggleSection(targetId);
            }
        });
    });

    document.querySelectorAll('[data-action="open-login"]').forEach(button => {
        button.addEventListener('click', openLoginModal);
    });

    document.querySelectorAll('[data-action="toggle-cart"]').forEach(button => {
        button.addEventListener('click', toggleCartSummary);
    });

    document.querySelectorAll('.Producto button').forEach(button => {
        button.dataset.originalText = button.textContent;
        button.addEventListener('click', () => {
            const productElement = button.closest('.Producto');
            if (productElement) {
                addToCart(productElement);
                const originalText = button.dataset.originalText || 'Agregado';
                button.textContent = 'Agregado';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 900);
            }
        });
    });
}

