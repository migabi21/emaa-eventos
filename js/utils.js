/*==================================================
=            UTILIDADES GENERALES
==================================================*/

/**
 * Realiza un desplazamiento suave hasta un elemento,
 * teniendo en cuenta la altura del encabezado.
 */

function scrollToElement(element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
}

function scrollToElement(element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: "smooth"
    });
}

/**
 * Formatea un número al formato monetario usado por EMAA.
 * Ejemplo: 150000 -> $150.000
 */
function formatMoney(amount) {
    return "$" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}