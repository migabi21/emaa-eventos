/*==================================================
=              LOGIN Y REGISTRO
==================================================*/

/**
 * Este módulo administra:
 * - Inicio de sesión
 * - Registro de usuarios
 * - Recuperación de contraseña
 * - Cambio entre paneles
 * - Mostrar/Ocultar contraseña
 */

const closeLogin = document.getElementById('closeLogin');
    const loginModal = document.getElementById('loginModal');
    const loginSubmit = document.getElementById('loginSubmit');
    const registerSubmit = document.getElementById('registerSubmit');
    const recoverSubmit = document.getElementById('recoverSubmit');
    const loginMessage = document.getElementById('loginMessage');
    const showRegister = document.getElementById('showRegister');
    const showRecover = document.getElementById('showRecover');
    const showLogin = document.getElementById('showLogin');

function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const loginMessage = document.getElementById('loginMessage');
    const loginPanel = document.getElementById('loginPanel');
    const showRegister = document.getElementById('showRegister');
    const showRecover = document.getElementById('showRecover');
    const showLogin = document.getElementById('showLogin');
    if (!loginModal || !loginPanel) return;
    loginModal.classList.remove('hidden');
    if (loginMessage) loginMessage.textContent = '';
    document.querySelectorAll('#loginPanel, #registerPanel, #recoverPanel').forEach(el => el.classList.add('hidden'));
    loginPanel.classList.remove('hidden');
    showRegister?.classList.remove('hidden');
    showRecover?.classList.remove('hidden');
    showLogin?.classList.add('hidden');
}

function changePanel(panel) {
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const recoverPanel = document.getElementById('recoverPanel');
    if (!panel) return;
    [loginPanel, registerPanel, recoverPanel].forEach(el => el?.classList.add('hidden'));
    panel.classList.remove('hidden');
}

function updatePanels(panel) {
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const recoverPanel = document.getElementById('recoverPanel');
    [loginPanel, registerPanel, recoverPanel].forEach(el => el?.classList.add('hidden'));
    panel?.classList.remove('hidden');

    showRegister?.classList.toggle('hidden', panel === registerPanel);
    showRecover?.classList.toggle('hidden', panel === recoverPanel);
    showLogin?.classList.toggle('hidden', panel === loginPanel);
    if (loginMessage) loginMessage.textContent = '';
    }

    if (loginSubmit) {
        loginSubmit.addEventListener('click', () => {
            const userInput = document.getElementById('loginUser');
            const passwordInput = document.getElementById('loginPassword');
            const user = userInput?.value.trim() || '';
            const pass = passwordInput?.value.trim() || '';

            if (!loginMessage) return;
            if (!user || !pass || userInput?.validity.valid === false || passwordInput?.validity.valid === false) {
                loginMessage.style.color = '#A50000';
                loginMessage.textContent = 'Completa usuario y contraseña.';
                return;
            }

            const storedUser = findStoredUser(user);
            if (storedUser && storedUser.password === pass) {
                localStorage.setItem('emaaLoggedUser', JSON.stringify({
                    name: storedUser.name,
                    email: storedUser.email
                }));
                loginMessage.style.color = '#023F56';
                loginMessage.textContent = `Bienvenido ${storedUser.name}`;
                renderUserSession();
                setTimeout(() => {
                    loginModal?.classList.add('hidden');
                    if (userInput) userInput.value = '';
                    if (passwordInput) passwordInput.value = '';
                }, 1200);
            } else {
                loginMessage.style.color = '#A50000';
                loginMessage.textContent = 'Usuario o contraseña incorrectos.';
            }
        });
    }

    if (registerSubmit) {
        registerSubmit.addEventListener('click', () => {
            const nameInput = document.getElementById('registerName');
            const emailInput = document.getElementById('registerEmail');
            const passwordInput = document.getElementById('registerPassword');
            const confirmInput = document.getElementById('registerPasswordConfirm');
            const name = nameInput?.value.trim() || '';
            const email = emailInput?.value.trim() || '';
            const pass = passwordInput?.value.trim() || '';
            const confirm = confirmInput?.value.trim() || '';
            if (loginMessage) {
                if (!name || !email || !pass || !confirm || emailInput?.validity.valid === false || passwordInput?.validity.valid === false || confirmInput?.validity.valid === false) {
                    loginMessage.style.color = '#A50000';
                    loginMessage.textContent = 'Completa todos los campos para crear tu cuenta.';
                    return;
                }
                if (pass.length < 8) {
                    loginMessage.style.color = '#A50000';
                    loginMessage.textContent = 'La contraseña debe tener mínimo 8 caracteres.';
                    return;
                }
                if (pass !== confirm) {
                    loginMessage.style.color = '#A50000';
                    loginMessage.textContent = 'Las contraseñas no coinciden.';
                    return;
                }

                const users = getStoredUsers();
                const duplicated = users.some(user =>
                    user.name.toLowerCase() === name.toLowerCase() || user.email.toLowerCase() === email.toLowerCase()
                );
                if (duplicated) {
                    loginMessage.style.color = '#A50000';
                    loginMessage.textContent = 'Este usuario o correo ya está registrado.';
                    return;
                }

                users.push({ name, email, password: pass, points: 0, orders: [], createdAt: new Date().toISOString() });
                saveStoredUsers(users);

                updatePanels(document.getElementById('loginPanel'));
                loginMessage.style.color = '#023F56';
                loginMessage.textContent = 'Cuenta creada correctamente. Inicia sesión ahora.';
                const loginUserInput = document.getElementById('loginUser');
                if (loginUserInput) loginUserInput.value = name;
                if (nameInput) nameInput.value = '';
                if (emailInput) emailInput.value = '';
                if (passwordInput) passwordInput.value = '';
                if (confirmInput) confirmInput.value = '';
            }
        });
    }

    if (recoverSubmit) {
        recoverSubmit.addEventListener('click', () => {
            const recoverEmailInput = document.getElementById('recoverEmail');
            const email = recoverEmailInput.value.trim();
            if (loginMessage) {
                if (!email || recoverEmailInput.validity.valid === false) {
                    loginMessage.style.color = '#A50000';
                    loginMessage.textContent = 'Ingresa tu correo para recuperar tu contraseña.';
                    return;
                }
                const storedUser = findStoredUser(email);
                if (!storedUser) {
                    loginMessage.style.color = '#A50000';
                    loginMessage.textContent = 'No encontramos una cuenta con ese correo.';
                    return;
                }
                loginMessage.style.color = '#023F56';
                loginMessage.textContent = `Tu usuario es ${storedUser.name}.`;
                setTimeout(() => updatePanels(document.getElementById('loginPanel')), 1200);
            }
        });
    }

    if (closeLogin && loginModal) {
        closeLogin.addEventListener('click', () => loginModal.classList.add('hidden'));
    }

    if (loginModal) {
        loginModal.addEventListener('click', event => {
            if (event.target === loginModal) loginModal.classList.add('hidden');
        });
    }

    if (showRegister) showRegister.addEventListener('click', () => updatePanels(document.getElementById('registerPanel')));
    if (showRecover) showRecover.addEventListener('click', () => updatePanels(document.getElementById('recoverPanel')));
    if (showLogin) showLogin.addEventListener('click', () => updatePanels(document.getElementById('loginPanel')));

function openHelpView() {
    const helpSection = document.getElementById('ayuda');
    if (!helpSection) return;
    document.querySelectorAll('section[id]').forEach(section => {
        if (section.id === 'ayuda') {
            section.classList.remove('oculto');
            section.style.display = 'block';
        } else {
            section.classList.add('oculto');
            section.style.display = 'none';
        }
    });
    helpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("registerPassword");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁️";
        }
    });

}

const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const passwordConfirmInput = document.getElementById("registerPasswordConfirm");

if (toggleConfirmPassword && passwordConfirmInput) {

    toggleConfirmPassword.addEventListener("click", () => {

        if (passwordConfirmInput.type === "password") {
            passwordConfirmInput.type = "text";
            toggleConfirmPassword.textContent = "🙈";
        } else {
            passwordConfirmInput.type = "password";
            toggleConfirmPassword.textContent = "👁️";
        }
    });

}

 document.querySelectorAll('[data-password-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            const input = document.getElementById(button.dataset.passwordToggle);
            const icon = button.querySelector('i');
            if (!input) return;
            const shouldShow = input.type === 'password';
            input.type = shouldShow ? 'text' : 'password';
            button.setAttribute('aria-label', shouldShow ? 'Ocultar contraseña' : 'Mostrar contraseña');
            if (icon) {
                icon.classList.toggle('fa-eye', !shouldShow);
                icon.classList.toggle('fa-eye-slash', shouldShow);
            }
        });
    });

    