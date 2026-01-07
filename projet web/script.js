/**
 * @file script.js
 * @description Main logic for the Restaurant Management Dashboard.
 * Handles data management, UI updates, and user interactions.
 */

// ==================== VARIABLES GLOBALES ====================

/** @type {string} Current active page identifier */
let currentPage = 'dashboard';

/** @type {string|null} Current modal type (dishes, orders, etc.) */
let currentModalType = null;

/** @type {number|null} ID of the item currently being edited */
let currentEditId = null;

/** @type {string} Current language ('fr', 'en', 'ar') */
let currentLang = 'fr';

/** @type {Object} Main application data storage */
let appData = {
    dishes: [
        { id: 1, name: "Pizza Margherita", category: "Pizza", price: 50, stock: 45, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150" },
        { id: 2, name: "Burger Classic", category: "Burger", price: 60, stock: 30, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150" },
        { id: 3, name: "Pâtes Carbonara", category: "Pâtes", price: 55, stock: 25, image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=150" },
        { id: 4, name: "Salade César", category: "Salade", price: 45, stock: 40, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=150" },
        { id: 5, name: "Sushi Mix", category: "Asiatique", price: 120, stock: 15, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150" },
        { id: 6, name: "Tacos Poulet", category: "Mexicain", price: 40, stock: 50, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=150" },
        { id: 7, name: "Steak Frites", category: "Viande", price: 90, stock: 20, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=150" },
        { id: 8, name: "Tiramisu", category: "Dessert", price: 35, stock: 25, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=150" }
    ],
    orders: [
        { id: 1, table_id: 2, total: 85, status: "completed", date: "2025-01-01" },
        { id: 2, table_id: 5, total: 115, status: "pending", date: "2025-01-05" },
        { id: 3, table_id: 1, total: 45, status: "served", date: "2025-01-05" }
    ],
    tables: [
        { id: 1, number: "T1", capacity: 2, status: "libre" },
        { id: 2, number: "T2", capacity: 4, status: "occupée" },
        { id: 3, number: "T3", capacity: 6, status: "réservée" },
        { id: 4, number: "T4", capacity: 2, status: "libre" },
        { id: 5, number: "T5", capacity: 4, status: "libre" }
    ],
    reservations: [
        { id: 1, client: "Fatima Zahra El Amraoui", table_id: 3, date: "2025-01-06", time: "19:00", persons: 4, status: "confirmée" },
        { id: 2, client: "Mohamed Alami", table_id: 2, date: "2025-01-07", time: "20:00", persons: 2, status: "en attente" }
    ],
    employees: [
        { id: 1, name: "Driss Rguibi", role: "Chef", email: "driss@restaurant.com", phone: "06 12 34 56 78" },
        { id: 2, name: "Sarah Bennani", role: "Serveur", email: "sarah@restaurant.com", phone: "06 98 76 54 32" },
        { id: 3, name: "Yassine Amrani", role: "Barman", email: "yassine@restaurant.com", phone: "06 11 22 33 44" }
    ]
};

/** @type {Object} Translation strings */
const translations = {
    fr: {
        dashboard: "Tableau de bord", dishes: "Plats", orders: "Commandes", tables: "Tables",
        reservations: "Réservations", employees: "Employés", logout: "Déconnexion",
        add: "Ajouter", edit: "Modifier", delete: "Supprimer", actions: "Actions",
        status: "Statut", menu_title: "Menu", search_placeholder: "Rechercher...",
        export_pdf: "Export PDF", login_title: "Manager", app_subtitle: "Système de gestion de restaurant",
        username_label: "Nom d'utilisateur", password_label: "Mot de passe",
        login_btn: "Se connecter", default_creds: "Identifiants par défaut:",
        creds_text: "Utilisateur: admin | Mot de passe: admin"
    },
    en: {
        dashboard: "Dashboard", dishes: "Dishes", orders: "Orders", tables: "Tables",
        reservations: "Reservations", employees: "Employees", logout: "Logout",
        add: "Add", edit: "Edit", delete: "Delete", actions: "Actions",
        status: "Status", menu_title: "Menu", search_placeholder: "Search...",
        export_pdf: "Export PDF", login_title: "Manager", app_subtitle: "Restaurant Management System",
        username_label: "Username", password_label: "Password",
        login_btn: "Login", default_creds: "Default Credentials:",
        creds_text: "User: admin | Password: admin"
    },
    ar: {
        dashboard: "لوحة التحكم", dishes: "الأطباق", orders: "الطلبات", tables: "الطاولات",
        reservations: "الحجوزات", employees: "الموظفين", logout: "تسجيل خروج",
        add: "إضافة", edit: "تعديل", delete: "حذف", actions: "إجراءات",
        status: "الحالة", menu_title: "القائمة", search_placeholder: "بحث...",
        export_pdf: "تصدير PDF", login_title: "المدير", app_subtitle: "نظام إدارة المطاعم",
        username_label: "اسم المستخدم", password_label: "كلمة المرور",
        login_btn: "تسجيل الدخول", default_creds: "بيانات الاعتماد الافتراضية:",
        creds_text: "المستخدم: admin | كلمة المرور: admin"
    }
};

// ==================== INITIALISATION ====================

/**
 * Loads the application logic after the DOM is ready.
 */
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

/**
 * Initializes the application: loads data, sets up events, and loads the initial page.
 */
function initApp() {
    if (!checkAuth()) return; // Stop if not logged in
    loadAppData();
    initGlobalEvents();//Événement déclenché quand la page est complètement chargée

    // Restore language preference
    const savedLang = localStorage.getItem('lang') || 'fr';
    changeLanguage(savedLang);

    // Load initial page
    loadPage(currentPage);
}

/**
 * Checks if the user is authenticated.
 * Redirects to login page if authentication is missing on protected pages.
 * @returns {boolean} True if authenticated, false otherwise.
 */
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isLoginPage = window.location.pathname.includes('login.html');

    if (!isLoggedIn && !isLoginPage) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/**
 * Loads application data from LocalStorage.
 * Falls back to default data if no save is found.
 */
const STORAGE_KEY = 'restaurantData_v3';

/**
 * Loads application data from LocalStorage.
 * Falls back to default data if no save is found.
 */
function loadAppData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            appData = JSON.parse(saved);//sert à transformer du texte en objet
        } catch (e) {
            console.error('Error parsing data:', e);
            // Default data remains effectively used
        }
    }
}

// ... (in saveAndRefresh)
function saveAndRefresh() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));// Cette commande prend tout cet objet complexe et le "compresse" en une seule longue chaîne de caractères (texte) au format JSON
    loadPage(currentPage);
}

/**
 * Sets up global event listeners for navigation, logout, and modals.
 */
function initGlobalEvents() {
    // Navigation handling
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.getAttribute('data-page');
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
            e.currentTarget.parentElement.classList.add('active');
            loadPage(page);
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Language Selector and restoration of the last selected language
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
        langSelect.value = localStorage.getItem('lang') || 'fr';
    }

    // Modal Events methods to close the modal
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalSave = document.getElementById('modalSave');

    if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);

    // Generic save handler
    if (modalSave) modalSave.addEventListener('click', handleModalSaveAction);
}

/**
 * Handles the login process.
 * @param {Event} e - The submit event.
 */
function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('username')?.value;
    const p = document.getElementById('password')?.value;

    // Simple verification (demo purposes)
    if (u === 'admin' && p === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        const errorMsg = document.getElementById('errorMessage');
        if (errorMsg) {
            errorMsg.textContent = 'Identifiants incorrects. Utilisez admin/admin';
            errorMsg.style.display = 'block';
        } else {
            alert('Identifiants incorrects. Utilisez admin/admin');
        }
    }
}

// ==================== NAVIGATION & AFFICHAGE ====================

/**
 * Loads the main content for a specific page section.
 * @param {string} page - The page identifier (e.g., 'dashboard', 'dishes').
 */
function loadPage(page) {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    currentPage = page;

    // Update active state in sidebar
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    const activeLink = document.querySelector(`.sidebar-menu a[data-page="${page}"]`);
    if (activeLink) activeLink.parentElement.classList.add('active');

    // Update Title
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.textContent = translations[currentLang][page] || page;

    // Render Content
    if (page === 'dashboard') {
        contentArea.innerHTML = getDashboardContent();
        setTimeout(initCharts, 50); // Wait for DOM to be ready
    } else {
        contentArea.innerHTML = getTableContent(page);
    }

    // Re-apply language translations to new content
    updateLanguage(currentLang);
}

/**
 * Generates the HTML for the dashboard view.
 * @returns {string} HTML string.
 */
function getDashboardContent() {
    const totalRev = appData.orders.reduce((acc, o) => acc + (o.status === 'completed' || o.status === 'served' ? o.total : 0), 0);
    const pendingOrders = appData.orders.filter(o => o.status === 'pending').length;
    const occupiedTables = appData.tables.filter(t => t.status === 'occupée').length;

    return `
    <div class="kpi-container">
        <div class="kpi-card">
            <div class="kpi-header">
                <h3>Revenus</h3>
                <i class="fas fa-coins"></i>
            </div>
            <div class="kpi-value">${totalRev} DH</div>
            <div class="kpi-change text-success"><i class="fas fa-arrow-up"></i> +12%</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header">
                <h3>Commandes en attente</h3>
                <i class="fas fa-receipt"></i>
            </div>
            <div class="kpi-value">${pendingOrders}</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-header">
                <h3>Tables Occupées</h3>
                <i class="fas fa-chair"></i>
            </div>
            <div class="kpi-value">${occupiedTables} / ${appData.tables.length}</div>
        </div>
    </div>
    
    <div class="charts-grid">
        <div class="chart-card">
            <h3><i class="fas fa-chart-line"></i> Commandes</h3>
            <canvas id="ordersChart"></canvas>
        </div>
        <div class="chart-card">
            <h3><i class="fas fa-chart-pie"></i> Catégories</h3>
            <canvas id="categoriesChart"></canvas>
        </div>
        <div class="chart-card">
            <h3><i class="fas fa-chart-bar"></i> Revenus Hebdomadaire</h3>
            <canvas id="revenueChart"></canvas>
        </div>
        <!-- New Charts from User Request -->
        <div class="chart-card wide-chart">
            <h3><i class="fas fa-calendar-alt"></i> Revenus Mensuels</h3>
            <canvas id="monthlyRevenueChart"></canvas>
        </div>
        <div class="chart-card">
            <h3><i class="fas fa-chair"></i> Statut Tables</h3>
            <canvas id="tableStatusChart"></canvas>
        </div>
        <div class="chart-card full-width-chart">
            <h3><i class="fas fa-smile"></i> Satisfaction / Performance</h3>
            <canvas id="employeePerfChart"></canvas>
        </div>
    </div>`;
}

/**
 * Initializes the charts using Chart.js.
 * Requires the canvas elements to be present in the DOM.
 */
function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') return;

    // 1. Orders Chart
    const ctxOrders = document.getElementById('ordersChart');
    if (ctxOrders) {
        new Chart(ctxOrders, {
            type: 'line',
            data: {
                labels: ['12h', '13h', '14h', '19h', '20h', '21h'],
                datasets: [{
                    label: 'Commandes',
                    data: [5, 12, 8, 15, 20, 10],
                    borderColor: '#FFB74D',
                    backgroundColor: 'rgba(255, 183, 77, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 2. Categories Chart
    const ctxCat = document.getElementById('categoriesChart');
    if (ctxCat) {
        const categories = {};
        appData.dishes.forEach(d => categories[d.category] = (categories[d.category] || 0) + 1);

        new Chart(ctxCat, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 3. Revenue Chart (Weekly)
    const ctxRev = document.getElementById('revenueChart');
    if (ctxRev) {
        new Chart(ctxRev, {
            type: 'bar',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'Revenus (DH)',
                    data: [1200, 950, 1100, 1500, 2200, 2500, 1800],
                    backgroundColor: '#FF5252',
                    borderRadius: 5
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 4. Monthly Revenue Chart
    const ctxMonthly = document.getElementById('monthlyRevenueChart');
    if (ctxMonthly) {
        new Chart(ctxMonthly, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [{
                    label: 'Revenus (DH)',
                    data: [1200, 1500, 1100, 1800, 2000, 2200],
                    backgroundColor: '#673AB7',
                    borderRadius: 5
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 5. Table Status Chart
    const ctxTableStatus = document.getElementById('tableStatusChart');
    if (ctxTableStatus) {
        // Calculate dynamic table status counts
        const libre = appData.tables.filter(t => t.status === 'libre').length;
        const occupee = appData.tables.filter(t => t.status === 'occupée').length;
        const reservee = appData.tables.filter(t => t.status === 'réservée').length;

        new Chart(ctxTableStatus, {
            type: 'bar',
            data: {
                labels: ['Libre', 'Occupée', 'Réservée'],
                datasets: [{
                    label: 'Tables',
                    data: [libre, occupee, reservee],
                    backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
            }
        });
    }

    // 6. Employee Performance / Satisfaction Chart
    const ctxPerf = document.getElementById('employeePerfChart');
    if (ctxPerf) {
        new Chart(ctxPerf, {
            type: 'radar',
            data: {
                labels: ['Rapidité', 'Qualité', 'Service', 'Ponctualité', 'Travail équipe'],
                datasets: [{
                    label: 'Moyenne Équipe',
                    data: [85, 90, 80, 95, 88],
                    borderColor: '#E91E63',
                    backgroundColor: 'rgba(233, 30, 99, 0.2)',
                    pointBackgroundColor: '#E91E63'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
}

/**
 * Generates the HTML for the data tables (CRUD views).
 * @param {string} type - The data type (dishes, orders, etc.).
 * @returns {string} HTML string.
 */
function getTableContent(type) {
    if (!appData[type]) return '<p>Données non trouvées.</p>';

    // Define columns per type
    const configs = {
        dishes: ['image', 'name', 'category', 'price', 'stock', 'actions'],
        orders: ['id', 'table_id', 'dishes', 'total', 'status', 'actions'],
        tables: ['number', 'capacity', 'status', 'actions'],
        reservations: ['client', 'date', 'time', 'persons', 'status', 'actions'],
        employees: ['name', 'role', 'email', 'phone', 'actions']
    };

    const headers = configs[type] || Object.keys(appData[type][0] || {});

    let rowsHtml = '';
    appData[type].forEach(item => {
        rowsHtml += '<tr>';
        headers.forEach(h => {
            rowsHtml += generateCellContent(type, h, item);
        });
        rowsHtml += '</tr>';
    });

    const headerHtml = headers.map(h => `<th>${translateHeader(h)}</th>`).join('');

    return `
    <div class="table-container">
        <div class="table-header">
            <div class="search-box">
                <input type="text" placeholder="Rechercher..." data-key="search_placeholder" onkeyup="filterTable(this)">
                <i class="fas fa-search"></i>
            </div>
            <div class="table-actions">
                <button class="btn-primary" onclick="openModal('${type}', 'add')">
                    <i class="fas fa-plus"></i> <span data-key="add">Ajouter</span>
                </button>
                <button class="btn-secondary" onclick="exportData('${type}')">
                    <i class="fas fa-file-pdf"></i> <span data-key="export_pdf">Export PDF</span>
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table id="dataTable">
                <thead><tr>${headerHtml}</tr></thead>
                <tbody>${rowsHtml}</tbody>
            </table>
        </div>
    </div>`;
}

/**
 * Translates table headers into readable text.
 * @param {string} key - The data key.
 * @returns {string} The translated header label.
 */
function translateHeader(key) {
    const map = {
        id: 'ID', image: 'IMAGE', name: 'NOM', category: 'CATÉGORIE', price: 'PRIX', stock: 'STOCK',
        table_id: 'TABLE', total: 'TOTAL', status: 'STATUT', date: 'DATE',
        number: 'NUMÉRO', capacity: 'CAPACITÉ', client: 'CLIENT', time: 'HEURE',
        persons: 'PERS.', role: 'RÔLE', email: 'EMAIL', phone: 'TÉL.', actions: 'ACTIONS', dishes: 'PLATS'
    };
    return map[key] || key.toUpperCase();
}

/**
 * Generates the content of a single table cell properly formatted.
 * @param {string} type - Data type.
 * @param {string} key - Column key.
 * @param {Object} item - The data item.
 * @returns {string} Cell HTML (<td>...</td>).
 */
function generateCellContent(type, key, item) {
    let content = item[key];

    if (key === 'actions') {
        return `
        <td>
            <div class="action-buttons-container">
            <button class="btn-icon view" onclick="viewDetails('${type}', ${item.id})" title="Voir"><i class="fas fa-eye"></i></button>
            <button class="btn-icon edit" onclick="window.openModal('${type}', 'edit', ${item.id})" title="Modifier"><i class="fas fa-edit"></i></button>
            <button class="btn-icon delete" onclick="window.deleteItem('${type}', ${item.id})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </td>`;
    }

    if (key === 'image') {
        return `<td><div class="img-placeholder"><img src="${content}" class="dish-thumbnail" onerror="this.src='https://via.placeholder.com/50?text=IMG'"></div></td>`;
    }

    if (key === 'status') {
        return `<td><span class="status-badge status-${content}">${content}</span></td>`;
    }

    if (key === 'table_id') {
        const table = appData.tables.find(t => t.id == content);
        return `<td>${table ? table.number : 'Table #' + content}</td>`;
    }

    if (key === 'dishes' && Array.isArray(content)) {
        const names = content.map(id => {
            const d = appData.dishes.find(x => x.id == id);
            return d ? d.name : '?';
        }).join(', ');
        return `<td>${names}</td>`;
    }

    if (key === 'price' || key === 'total') {
        return `<td>${content} DH</td>`;
    }

    return `<td>${content || ''}</td>`;
}

// ==================== MODAL & FORMS ====================

/**
 * Opens the modal for adding or editing an item.
 * Exposed globally for inline onclicks.
 * @param {string} type - 'dishes', 'orders', etc.
 * @param {string} action - 'add' or 'edit'.
 * @param {number|null} id - ID of item to edit.
 */
window.openModal = function (type, action, id = null) {
    currentModalType = type;
    currentEditId = id;

    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const saveBtn = document.getElementById('modalSave');
    const overlay = document.getElementById('modalOverlay');

    if (title) title.textContent = (action === 'add' ? 'Ajouter' : 'Modifier') + ' - ' + type;

    // Reset button state
    if (saveBtn) {
        saveBtn.style.display = ''; // Reset visibility
        saveBtn.textContent = 'Enregistrer';
        saveBtn.classList.remove('btn-danger');
        saveBtn.classList.add('btn-primary');
        saveBtn.onclick = null; // Clear previous specific handlers if any
    }

    if (body) {
        body.innerHTML = generateFormHtml(type, id);
    }

    if (overlay) overlay.classList.add('active');

    // Special handlers for dynamic form elements
    if (type === 'orders') {
        setupOrderFormListeners();
    }
};

/**
 * Generates the HTML form for the modal based on type.
 * @param {string} type 
 * @param {number|null} id 
 * @returns {string} Form HTML.
 */
function generateFormHtml(type, id) {
    const item = id ? appData[type].find(i => i.id === id) : {};
    let fields = '';

    const createInput = (label, key, type = 'text', val = '') => `
        <div class="form-group">
            <label>${label}</label>
            <input type="${type}" id="input_${key}" value="${val}" class="form-control">
        </div>`;

    const createSelect = (label, key, options, selected) => `
        <div class="form-group">
            <label>${label}</label>
            <select id="input_${key}" class="form-control">
                ${options.map(o => `<option value="${o}" ${selected == o ? 'selected' : ''}>${o}</option>`).join('')}
            </select>
        </div>`;

    if (type === 'dishes') {
        fields += createInput('Nom', 'name', 'text', item.name || '');
        fields += createSelect('Catégorie', 'category', ['Pizza', 'Burger', 'Pâtes', 'Salade'], item.category);
        fields += createInput('Prix', 'price', 'number', item.price || '');
        fields += createInput('Stock', 'stock', 'number', item.stock || '');
        fields += createInput('Image URL', 'image', 'text', item.image || '');
    }
    else if (type === 'tables') {
        fields += createInput('Numéro', 'number', 'text', item.number || '');
        fields += createInput('Capacité', 'capacity', 'number', item.capacity || '');
        fields += createSelect('Statut', 'status', ['libre', 'occupée', 'réservée'], item.status);
    }
    else if (type === 'employees') {
        fields += createInput('Nom', 'name', 'text', item.name || '');
        fields += createSelect('Rôle', 'role', ['Serveur', 'Chef', 'Barman', 'Manager'], item.role);
        fields += createInput('Email', 'email', 'email', item.email || '');
        fields += createInput('Téléphone', 'phone', 'tel', item.phone || '');
    }
    else if (type === 'reservations') {
        fields += createInput('Client', 'client', 'text', item.client || '');

        const tablesOpts = appData.tables.map(t => `<option value="${t.id}" ${item.table_id == t.id ? 'selected' : ''}>${t.number}</option>`).join('');
        fields += `<div class="form-group"><label>Table</label><select id="input_table_id">${tablesOpts}</select></div>`;

        fields += createInput('Date', 'date', 'date', item.date || '');
        fields += createInput('Heure', 'time', 'time', item.time || '');
        fields += createInput('Nombre de personnes', 'persons', 'number', item.persons || '');
        fields += createSelect('Statut', 'status', ['confirmée', 'en attente', 'annulée'], item.status);
    }
    else if (type === 'orders') {
        const tablesOpts = appData.tables.map(t => `<option value="${t.id}" ${item.table_id == t.id ? 'selected' : ''}>${t.number}</option>`).join('');
        fields += `<div class="form-group"><label>Table</label><select id="input_table_id">${tablesOpts}</select></div>`;

        // Dish selector
        let dishHtml = '<div class="dishes-selector">';
        appData.dishes.forEach(d => {
            const checked = (item.dishes || []).includes(d.id) ? 'checked' : '';
            dishHtml += `
                <div class="dish-option">
                    <input type="checkbox" id="dish_${d.id}" value="${d.id}" data-price="${d.price}" ${checked}>
                    <label for="dish_${d.id}">
                        <strong>${d.name}</strong>
                        <span>${d.price} DH</span>
                    </label>
                </div>
            `;
        });
        dishHtml += '</div>';
        fields += `<div class="form-group"><label>Plats</label>${dishHtml}</div>`;

        fields += createInput('Total', 'total', 'number', item.total || 0);
        fields += createSelect('Statut', 'status', ['pending', 'served', 'completed', 'cancelled'], item.status);
    }

    return `<form id="crudForm">${fields}</form>`;
}

/**
 * Handles the save action from the modal (Create or Update).
 */
function handleModalSaveAction() {
    // If it's a delete confirmation, the button text or ID might differ, 
    // but here we simplify by using currentModalType check.
    if (currentModalType === 'delete_confirm') {
        performDelete();
        return;
    }

    // Standard Save
    const form = document.getElementById('crudForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    let newItem;
    if (currentEditId) {
        newItem = appData[currentModalType].find(i => i.id === currentEditId);
    } else {
        // Generate sequential ID
        const items = appData[currentModalType];
        const maxId = items.length > 0 ? Math.max(...items.map(i => i.id)) : 0;
        newItem = { id: maxId + 1 };
    }

    inputs.forEach(input => {
        if (input.type === 'checkbox') return; // Handled separately
        const key = input.id.replace('input_', '');
        if (!key) return;

        if (input.type === 'number') {
            newItem[key] = parseFloat(input.value) || 0;
        } else {
            newItem[key] = input.value;
        }
    });

    // Handle checkboxes for orders
    if (currentModalType === 'orders') {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        newItem.dishes = Array.from(checkboxes).map(cb => parseInt(cb.value));
        // Recalculate total just in case
        let total = 0;
        checkboxes.forEach(cb => total += parseFloat(cb.dataset.price));
        newItem.total = total;
    }

    // Check capacity for reservations
    if (currentModalType === 'reservations') {
        const table = appData.tables.find(t => t.id == newItem.table_id);
        if (table && newItem.persons > table.capacity) {
            alert(`Capacité dépassée ! La table ${table.number} ne peut accepter que ${table.capacity} personnes.`);
            return;
        }
    }

    if (!currentEditId) {
        appData[currentModalType].push(newItem);
    }

    // Logic for automatic table status update
    if (currentModalType === 'reservations' && newItem.status === 'confirmée') {
        const table = appData.tables.find(t => t.id == newItem.table_id);
        if (table) {
            table.status = 'occupée';
        }
    }

    saveAndRefresh();
    closeModal();
}

/**
 * Persists data to LocalStorage and refreshes the current view.
 */
function saveAndRefresh() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    loadPage(currentPage);
}

/**
 * Closes the active modal.
 */
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('active');
    currentModalType = null;
    currentEditId = null;
}

/**
 * Prepares the modal for a delete confirmation.
 * Exposed globally.
 * @param {string} type 
 * @param {number} id 
 */
window.deleteItem = function (type, id) {
    currentModalType = 'delete_confirm'; // distinct state
    currentEditId = id;

    // Store original type to know what to delete
    window.tempDeleteType = type;

    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const saveBtn = document.getElementById('modalSave');
    const overlay = document.getElementById('modalOverlay');

    if (title) title.textContent = 'Confirmer la suppression';
    if (body) body.innerHTML = `
        <div class="delete-confirm-body">
            <i class="fas fa-exclamation-circle delete-icon-warning"></i>
            <p>Êtes-vous sûr de vouloir supprimer cet élément ? (ID: ${id})</p>
            <p class="delete-hint text-danger">Cette action est irréversible.</p>
        </div>`;

    if (saveBtn) {
        saveBtn.textContent = 'Supprimer';
        saveBtn.classList.remove('btn-primary');
        saveBtn.classList.add('btn-danger');
    }

    if (overlay) overlay.classList.add('active');
};

/**
 * Executes the actual deletion of an item.
 */
function performDelete() {
    const type = window.tempDeleteType;
    if (appData[type]) {
        appData[type] = appData[type].filter(i => i.id !== currentEditId);
        saveAndRefresh();
    }
    closeModal();
}

/**
 * Shows details of an item in a read-only modal.
 * Exposed globally.
 * @param {string} type 
 * @param {number} id 
 */
window.viewDetails = function (type, id) {
    const item = appData[type].find(i => i.id === id);
    if (!item) return;

    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const saveBtn = document.getElementById('modalSave');
    const overlay = document.getElementById('modalOverlay');

    if (title) title.textContent = 'Détails';

    let html = '<div class="details-view">';
    for (const [key, val] of Object.entries(item)) {
        html += `<div class="detail-row"><strong>${key}:</strong> <span>${val}</span></div>`;
    }
    html += '</div>';

    if (body) body.innerHTML = html;
    if (saveBtn) saveBtn.style.display = 'none'; // Hide save button for view only

    if (overlay) overlay.classList.add('active');

    // Restore save button when closed? 
    // Easier: Just ensure opening other modals resets the button style/visibility
    // (Handled in openModal)
};

/**
 * Exports the current table data to CSV.
 * Exposed globally.
 * @param {string} type 
 */
/**
 * Exports the current table data to PDF.
 * Exposed globally.
 * @param {string} type 
 */
window.exportData = function (type) {
    const data = appData[type];
    if (!data || !data.length) return alert('Aucune donnée à exporter.');

    // Ensure jsPDF is loaded
    const { jsPDF } = window.jspdf;
    if (!jsPDF) return alert('Erreur : jsPDF non chargé.');

    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text(`Rapport: ${translations[currentLang][type] || type}`, 14, 22);
    doc.setFontSize(11);
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 14, 30);

    // Prepare columns and rows
    const columns = Object.keys(data[0]).filter(k => k !== 'image').map(key => ({
        header: translateHeader(key),
        dataKey: key
    }));

    const rows = data.map(item => {
        let row = { ...item };
        // Process specific fields for better display
        if (row.table_id) {
            const t = appData.tables.find(tbl => tbl.id == row.table_id);
            row.table_id = t ? t.number : row.table_id;
        }
        if (Array.isArray(row.dishes)) {
            row.dishes = row.dishes.length + ' plats';
        }
        return row;
    });

    // Generate Table
    doc.autoTable({
        head: [columns.map(c => c.header)],
        body: rows.map(r => columns.map(c => r[c.dataKey])),
        startY: 40,
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [255, 183, 77] } // Primary color
    });

    doc.save(`${type}_export_${Date.now()}.pdf`);
};

// ==================== UTILS ====================

/**
 * Changes the application language.
 * @param {string} lang - 'fr', 'en', or 'ar'.
 */
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }
    updateLanguage(lang);

    // Refresh current view headers if needed
    loadPage(currentPage);
}

/**
 * Updates text content of elements with [data-key] attribute.
 * @param {string} lang 
 */
function updateLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
}

/**
 * Filtering function for tables.
 * Exposed globally for onkeyup.
 * @param {HTMLInputElement} input 
 */
window.filterTable = function (input) {
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll('#dataTable tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
};

/**
 * Sets up listeners for auto-calculating order totals in the modal.
 */
function setupOrderFormListeners() {
    const inputs = document.querySelectorAll('#crudForm input[type="checkbox"]');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            let total = 0;
            document.querySelectorAll('#crudForm input[type="checkbox"]:checked').forEach(cb => {
                total += parseFloat(cb.dataset.price || 0);
            });
            const totalInput = document.getElementById('input_total');
            if (totalInput) totalInput.value = total;
        });
    });
}
