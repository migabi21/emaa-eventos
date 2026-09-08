/*==================================================
=            CARRITO DE COMPRAS
==================================================*/

/**
 * Módulo encargado de administrar el carrito de compras.
 *
 * Funciones principales:
 * - Agregar productos.
 * - Modificar cantidades.
 * - Eliminar productos.
 * - Calcular totales.
 * - Guardar y cargar el carrito.
 * - Procesar la compra.
 */

function toggleCartSummary() {
    const cartSummary = document.getElementById('cartSummary');
    if (!cartSummary) return;
    cartSummary.classList.toggle('hidden');
    if (!cartSummary.classList.contains('hidden')) {
        cartSummary.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function renderCart(cartItems, cartCount, cartTotal) {

    const cartItemsList =
        document.getElementById('cartItemsList');

    const cartCountEl =
        document.getElementById('cartCount');

    const cartCountText =
        document.getElementById('cartCountText');

    const cartTotalText =
        document.getElementById('cartTotalText');

    const cartPointsText =
        document.getElementById('cartPointsText');

    const cartSummary =
        document.getElementById('cartSummary');

    if (cartCountEl) {

        cartCountEl.textContent =
            cartCount;

    }

    // El panel de detalle del carrito no se muestra en la página de inicio.
    // Se conserva únicamente el contador del ícono del encabezado.
    if (!cartItemsList || !cartSummary) return;

    cartItemsList.innerHTML = '';


    const keys = Object.keys(cartItems);


    /*=========================================
                    CARRITO VACÍO
    =========================================*/

    if (keys.length === 0) {

        cartItemsList.innerHTML = `
            <div class="carrito-vacio">

                <i class="fas fa-cart-shopping"></i>

                <h3>Tu carrito está vacío</h3>

                <p>
                    Todavía no has agregado productos.
                </p>

                <a href="productos.html">
                    Ver productos
                </a>

            </div>
        `;

    }


    /*=========================================
                  PRODUCTOS
    =========================================*/

    else {

        keys.forEach(name => {

            const item = cartItems[name];

            const quantity =
                Number(item.quantity) || 0;

            const price =
                Number(item.price) || 0;

            const subtotal =
                quantity * price;


            const line =
                document.createElement('div');


            line.className = 'cart-item';


            line.innerHTML = `

                <div class="cart-item-main">

                    <div class="cart-item-name">
                        ${name}
                    </div>


                    <div class="cart-item-price">

                        Precio:
                        ${formatMoney(price)}

                    </div>


                    <div class="cart-item-controls">

                        <button
                            type="button"
                            class="qty-button"
                            data-name="${name}"
                            data-action="decrease">

                            −

                        </button>


                        <span class="qty-value">
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            class="qty-button"
                            data-name="${name}"
                            data-action="increase">

                            +

                        </button>


                        <button
                            type="button"
                            class="remove-item"
                            data-name="${name}">

                            <i class="fas fa-trash"></i>
                            Eliminar

                        </button>

                    </div>

                </div>


                <strong class="cart-item-subtotal">

                    ${formatMoney(subtotal)}

                </strong>

            `;


            cartItemsList.appendChild(line);

        });


        /*=========================================
                  BOTONES CANTIDAD
        =========================================*/

        cartItemsList
            .querySelectorAll('.qty-button')
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {

                        const name =
                            button.dataset.name;

                        const action =
                            button.dataset.action;


                        changeQuantity(
                            name,
                            action === 'increase'
                                ? 1
                                : -1
                        );

                    }
                );

            });


        /*=========================================
                    ELIMINAR
        =========================================*/

        cartItemsList
            .querySelectorAll('.remove-item')
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {

                        const name =
                            button.dataset.name;

                        removeItem(name);

                    }
                );

            });

    }


    /*=========================================
                    RESUMEN
    =========================================*/

    if (cartCountEl) {

        cartCountEl.textContent =
            cartCount;

    }


    if (cartCountText) {

        cartCountText.textContent =
            cartCount;

    }


    if (cartTotalText) {

        cartTotalText.textContent =
            formatMoney(cartTotal);

    }


    if (cartPointsText) {

        cartPointsText.textContent =
            `${Math.floor(cartTotal / 1000)} pts`;

    }


    if (cartSummary) {

        cartSummary.classList.remove('hidden');

    }

}

function recalcCart(cartItems) {

    let count = 0;
    let total = 0;

    Object.values(cartItems).forEach(item => {

        const quantity = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;

        item.quantity = quantity;
        item.price = price;
        item.subtotal = quantity * price;

        count += quantity;
        total += item.subtotal;

    });

    return {
        count,
        total
    };
}

function saveCart(cartItems, cartCount, cartTotal) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount.toString());
    localStorage.setItem('cartTotal', cartTotal.toString());
}

function loadCart() {

    const cartItems = JSON.parse(
        localStorage.getItem('cartItems') || '{}'
    );

    const totals = recalcCart(cartItems);

    saveCart(
        cartItems,
        totals.count,
        totals.total
    );

    renderCart(
        cartItems,
        totals.count,
        totals.total
    );
}

function addToCart(productElement) {
    const name = productElement.dataset.name || productElement.querySelector('h3')?.textContent || 'Producto';
    const price = Number(productElement.dataset.price || 0);
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    const existing = cartItems[name] || { quantity: 0, price };
    existing.quantity += 1;
    existing.price = price;
    existing.subtotal = existing.quantity * price;
    cartItems[name] = existing;
    const totals = recalcCart(cartItems);
    saveCart(cartItems, totals.count, totals.total);
    renderCart(cartItems, totals.count, totals.total);
}

function changeQuantity(name, delta) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    const item = cartItems[name];
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        delete cartItems[name];
    } else {
        item.subtotal = item.quantity * item.price;
    }
    const totals = recalcCart(cartItems);
    saveCart(cartItems, totals.count, totals.total);
    renderCart(cartItems, totals.count, totals.total);
}

function removeItem(name) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    if (!cartItems[name]) return;
    delete cartItems[name];
    const totals = recalcCart(cartItems);
    saveCart(cartItems, totals.count, totals.total);
    renderCart(cartItems, totals.count, totals.total);
}

function clearCart() {
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', '0');
    localStorage.setItem('cartTotal', '0');
    renderCart({}, 0, 0);
}
const checkoutBtn =
    document.getElementById('checkoutBtn');

const whatsappPayBtn =
    document.getElementById('whatsappPayBtn');

if (checkoutBtn) {

    checkoutBtn.addEventListener('click', () => {

        const cartItems =
            JSON.parse(
                localStorage.getItem('cartItems') || '{}'
            );

        const totals =
            recalcCart(cartItems);

        if (totals.count === 0) return;

        const loggedUser =
            typeof getLoggedUser === "function"
                ? getLoggedUser()
                : null;

        let message =
            'Pedido registrado correctamente.';

        if (loggedUser) {

            const pointsResult =
                registerOrderPoints(totals.total);

            if (pointsResult.ok) {

                message =
                    `Pedido registrado. ` +
                    `Sumaste ${pointsResult.earnedPoints} puntos. ` +
                    `Total acumulado: ${pointsResult.totalPoints} puntos.`;

            }

        }

        clearCart();

        alert(message);

        window.location.href = "index.html";

    });

}

    
    if (whatsappPayBtn) {
        whatsappPayBtn.addEventListener('click', () => {
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
            const totals = recalcCart(cartItems);
            if (totals.count === 0) return;
            const lines = Object.entries(cartItems).map(([name, item]) => `${item.quantity} x ${name} = ${formatMoney(item.subtotal)}`);
            const pointsToEarn = Math.floor(totals.total / 1000);
            const message = `Hola, quiero pagar mi pedido.\n${lines.join('\n')}\nTotal: ${formatMoney(totals.total)}\nPuntos a ganar: ${pointsToEarn}`;
            const url = `https://wa.me/573246501091?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
            const loggedUser = getLoggedUser();
            if (loggedUser) {
                const pointsResult = registerOrderPoints(totals.total);
                if (pointsResult.ok) {
                    alert(`Pedido registrado. Sumaste ${pointsResult.earnedPoints} puntos. Total acumulado: ${pointsResult.totalPoints} puntos.`);
                }
            } else {
                alert('Venta iniciada. Continúa en WhatsApp para finalizar tu pedido.');
            }
            clearCart();
        });
    }
