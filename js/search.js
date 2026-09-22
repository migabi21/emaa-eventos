/*==================================================
=               BÚSQUEDA DE PRODUCTOS
==================================================*/

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


/**
 * Filtra los productos que existen en la página actual.
 */
function filtrarProductos() {

    const buscador = document.getElementById("buscador");

    if (!buscador) return;

    const texto = normalizarTexto(buscador.value);

    const productos = document.querySelectorAll(".Producto");

    let encontrados = 0;

    productos.forEach(producto => {

        const nombre = normalizarTexto(
            producto.dataset.name ||
            producto.querySelector("h3")?.textContent ||
            producto.textContent
        );

        const coincide = texto === "" || nombre.includes(texto);

        producto.style.display = coincide ? "" : "none";

        if (coincide && texto !== "") {
            encontrados++;
        }
    });

    return encontrados;
}


/**
 * Ejecuta la búsqueda.
 */
function ejecutarBusqueda(event) {

    if (event) {
        event.preventDefault();
    }

    const buscador = document.getElementById("buscador");

    if (!buscador) return;

    const texto = buscador.value.trim();

    if (texto === "") {
        return;
    }

    /*
     * Si estamos en productos.html,
     * buscamos directamente en esta página.
     */
    const estamosEnProductos =
        window.location.pathname.toLowerCase().includes("productos.html");

    if (estamosEnProductos) {

        filtrarProductos();

        const productosSection = document.getElementById("Productos");

        if (productosSection) {
            productosSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        buscador.focus();

        return;
    }


    /*
     * Si estamos en el inicio,
     * enviamos la búsqueda a productos.html.
     */
    const busqueda = encodeURIComponent(texto);

    window.location.href = `productos.html?buscar=${busqueda}`;
}


/**
 * Inicializar buscador.
 */
document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("buscador");
    const btnBuscar = document.getElementById("btnBuscar");
    const searchForm = document.getElementById("searchForm");

    if (!buscador) return;


    /*
     * Buscar al presionar Enter.
     */
    if (searchForm) {

        searchForm.addEventListener("submit", ejecutarBusqueda);

    }


    /*
     * Botón de búsqueda.
     */
    if (btnBuscar) {

        btnBuscar.addEventListener("click", ejecutarBusqueda);

    }


    /*
     * Si estamos en productos.html,
     * revisar si llegó una búsqueda desde otra página.
     */
    const parametros = new URLSearchParams(window.location.search);

    const busquedaURL = parametros.get("buscar");

    if (busquedaURL) {

        buscador.value = busquedaURL;

        filtrarProductos();

        const productosSection = document.getElementById("Productos");

        if (productosSection) {

            setTimeout(() => {

                productosSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    }

});