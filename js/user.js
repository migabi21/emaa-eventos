/*==================================================
=                    USUARIOS
==================================================*/

/**
 * Gestión de usuarios, sesión y puntos de fidelización.
 * Todas las funciones relacionadas con usuarios deben
 * permanecer en este módulo.
 */

function getStoredUsers() {
    return JSON.parse(localStorage.getItem('emaaUsers') || '[]');
}

function saveStoredUsers(users) {
    localStorage.setItem('emaaUsers', JSON.stringify(users));
}

function findStoredUser(identifier) {
    const normalized = identifier.trim().toLowerCase();
    return getStoredUsers().find(user =>
        user.name.toLowerCase() === normalized || user.email.toLowerCase() === normalized
    );
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem('emaaLoggedUser') || 'null');
}

function getUserPoints(user) {
    return Number(user?.points || 0);
}

function updateStoredUser(updatedUser) {
    const users = getStoredUsers();
    const index = users.findIndex(user => user.email.toLowerCase() === updatedUser.email.toLowerCase());
    if (index >= 0) {
        users[index] = { ...users[index], ...updatedUser };
        saveStoredUsers(users);
    }
}

function renderUserSession() {
    const loggedUser = getLoggedUser();
    const loginButton = document.getElementById('userLoginBtn');
    const sessionCard = document.getElementById('userSessionCard');
    const userName = document.getElementById('loggedUser');
    const userPoints = document.getElementById('userPoints');

    if (!loginButton || !sessionCard || !userName || !userPoints) return;

    if (!loggedUser) {
        loginButton.classList.remove('hidden');
        sessionCard.classList.add('hidden');
        userName.textContent = '';
        userPoints.textContent = '';
        return;
    }

    const storedUser = findStoredUser(loggedUser.email) || loggedUser;
    loginButton.classList.add('hidden');
    sessionCard.classList.remove('hidden');
    userName.textContent = storedUser.name;
    userPoints.textContent = `${getUserPoints(storedUser)} pts`;
}

function registerOrderPoints(total) {
    const loggedUser = getLoggedUser();
    if (!loggedUser) return { ok: false, reason: 'login' };

    const users = getStoredUsers();
    const index = users.findIndex(user => user.email.toLowerCase() === loggedUser.email.toLowerCase());
    if (index < 0) return { ok: false, reason: 'missing-user' };

    const earnedPoints = Math.floor(total / 1000);
    users[index].points = getUserPoints(users[index]) + earnedPoints;
    users[index].orders = users[index].orders || [];
    users[index].orders.push({
        total,
        earnedPoints,
        date: new Date().toISOString()
    });
    saveStoredUsers(users);
    localStorage.setItem('emaaLoggedUser', JSON.stringify({
        name: users[index].name,
        email: users[index].email
    }));
    renderUserSession();
    return { ok: true, earnedPoints, totalPoints: users[index].points };
}

  const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('emaaLoggedUser');
            renderUserSession();
        });
    }