/*==================================================
=                    CARRUSEL
==================================================*/

/**
 * Inicializa el carrusel de productos destacados.
 * Configura la navegación y el desplazamiento automático.
 */

function setupCarousel() {
    const carousel = document.querySelector('.carrusel');
    if (!carousel) return;

    const images = Array.from(carousel.querySelectorAll('.carrusel-imagen'));
    const nextButton = carousel.querySelector('.carrusel-next');
    const prevButton = carousel.querySelector('.carrusel-prev');
    const indicators = carousel.querySelector('.carrusel-indicadores');
    if (images.length === 0 || !indicators) return;

    let activeIndex = 0;
    let carouselTimer;

    indicators.replaceChildren();

    images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carrusel-punto';
        dot.setAttribute('aria-label', `Ver imagen ${index + 1}`);
        dot.addEventListener('click', () => {
            showSlide(index);
            restartCarousel();
        });
        indicators.appendChild(dot);
    });

    const dots = Array.from(indicators.querySelectorAll('.carrusel-punto'));

    function showSlide(index) {
        activeIndex = (index + images.length) % images.length;
        images.forEach((image, imageIndex) => {
            image.classList.toggle('activa', imageIndex === activeIndex);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('activo', dotIndex === activeIndex);
        });
    }

    function nextSlide() {
        showSlide(activeIndex + 1);
    }

    function restartCarousel() {
        clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, 4500);
    }

    nextButton?.addEventListener('click', () => {
        nextSlide();
        restartCarousel();
    });

    prevButton?.addEventListener('click', () => {
        showSlide(activeIndex - 1);
        restartCarousel();
    });

    carousel.addEventListener('mouseenter', () => clearInterval(carouselTimer));
    carousel.addEventListener('mouseleave', restartCarousel);

    showSlide(0);
    restartCarousel();
}