/*==================================================
=               BÚSQUEDA DE PRODUCTOS
==================================================*/

/**
 * Filtra los productos según el texto ingresado
 * en el buscador.
 */
function filtrarProductos() {

    const buscador = document.getElementById("buscador");
    if (!buscador) return;

    const texto = buscador.value.toLowerCase();
    const productos = document.querySelectorAll(".Producto");

    productos.forEach(producto => {

        const nombre = producto.textContent.toLowerCase();

        producto.style.display = nombre.includes(texto)
            ? "flex"
            : "none";
    });
}

const buscador = document.getElementById('buscador');
    const btnBuscar = document.getElementById('btnBuscar');
    const searchForm = document.getElementById('searchForm');

    if (buscador) {
        buscador.addEventListener('keyup', filtrarProductos);
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', () => {
            filtrarProductos();
            buscador?.focus();
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', event => {
            event.preventDefault();
            filtrarProductos();
            buscador?.focus();
        });
    }