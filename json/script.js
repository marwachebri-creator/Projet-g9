// ==================== VARIABLES GLOBALES ====================
let currentPage = 'dashboard';
let currentModalType = null;
let currentEditId = null;
let currentLang = 'fr';

// Données simulées (Structure plus complète)
let appData = {
    "dishes": [
        { id: 1, name: "Pizza Margherita", category: "Pizza", price: 50, stock: 45, description: "Tomate, mozza, basilic", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150" },
        { id: 2, name: "Burger Classic", category: "Burger", price: 60, stock: 30, description: "Bœuf, cheddar, salade, tomate", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150" },
        { id: 3, name: "Pâtes Carbonara", category: "Pâtes", price: 55, stock: 25, description: "Crème, lardons, parmesan", image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=150" },
        { id: 4, name: "Salade César", category: "Salade", price: 45, stock: 40, description: "Poulet, croûtons, parmesan", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=150" },
        { id: 5, name: "Steak Frites", category: "Viande", price: 90, stock: 20, description: "Steak de bœuf avec frites maison", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=150" },
        { id: 6, name: "Saumon Grillé", category: "Poisson", price: 110, stock: 15, description: "Saumon frais grillé avec légumes", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=150" },
        { id: 7, name: "Tiramisu", category: "Dessert", price: 35, stock: 50, description: "Café, mascarpone, cacao", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=150" },
        { id: 8, name: "Soupe du jour", category: "Entrée", price: 25, stock: 35, description: "Soupe fraîche préparée quotidiennement", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=150" }
    ],
    "orders": [
        { id: 1001, table_id: 2, dishes: [1, 7], total: 20.49, status: "completed", date: "2025-01-01T12:30:00" },
        { id: 1002, table_id: 5, dishes: [2, 3], total: 28.40, status: "pending", date: "2025-01-01T19:15:00" },
        { id: 1003, table_id: 1, dishes: [4], total: 11.50, status: "served", date: "2025-01-01T20:00:00" },
        { id: 1004, table_id: 3, dishes: [1, 2, 7], total: 34.99, status: "completed", date: "2024-12-31T18:30:00" }
    ],
    "tables": [
        { id: 1, number: "T1", capacity: 2, status: "libre" },
        { id: 2, number: "T2", capacity: 4, status: "occupée" },
        { id: 3, number: "T3", capacity: 6, status: "réservée" },
        { id: 4, number: "T4", capacity: 2, status: "libre" },
        { id: 5, number: "T5", capacity: 8, status: "occupée" }
    ],
    "reservations": [
        { id: 1, client: "Fatima Zahra El Amraoui", table_id: 3, date: "2025-01-02", time: "19:00", persons: 4, status: "confirmée" },
        { id: 2, client: "Mohamed Alami", table_id: 2, date: "2025-01-03", time: "20:00", persons: 2, status: "en attente" }
    ],
    "employees": [
        { id: 1, name: "Driss Rguibi", role: "Chef", email: "driss.rguibi@restaurant.com", phone: "06 12 34 56 78", shift: "Matin", salary: 3800 },
        { id: 2, name: "Sarah Bennani", role: "Serveur", email: "sarah.bennani@restaurant.com", phone: "06 98 76 54 32", shift: "Matin", salary: 2200 },
        { id: 3, name: "Yassine Amrani", role: "Barman", email: "yassine.amrani@restaurant.com", phone: "06 11 22 33 44", shift: "Soir", salary: 2300 },
        { id: 4, name: "Salma El Alami", role: "Manager", email: "salma.elalami@restaurant.com", phone: "06 55 44 33 22", shift: "Journée", salary: 4500 },
        { id: 5, name: "Amine Tazi", role: "Plongeur", email: "amine.tazi@restaurant.com", phone: "06 77 88 99 00", shift: "Soir", salary: 1900 }
    ]
};

// Traductions
const translations = {
    fr: {
        dashboard: "Tableau de bord",
        dishes: "Plats",
        orders: "Commandes",
        tables: "Tables",
        reservations: "Réservations",
        employees: "Employés",
        logout: "Déconnexion",
        search: "Rechercher...",
        add: "Ajouter",
        edit: "Modifier",
        delete: "Supprimer",
        save: "Enregistrer",
        cancel: "Annuler",
        actions: "Actions",
        status: "Statut",
        total: "Total",
        date: "Date",
        category: "Catégorie",
        price: "Prix",
        stock: "Stock",
        table: "Table",
        capacity: "Capacité",
        client: "Client",
        role: "Rôle",
        export: "Exporter",
        welcome: "Bienvenue",
        revenue: "Chiffre d'affaires",
        order_count: "Nombre de commandes",
        occupied_tables: "Tables occupées"
    },
    en: {
        dashboard: "Dashboard",
        dishes: "Dishes",
        orders: "Orders",
        tables: "Tables",
        reservations: "Reservations",
        employees: "Employees",
        logout: "Logout",
        search: "Search...",
        add: "Add",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        actions: "Actions",
        status: "Status",
        total: "Total",
        date: "Date",
        category: "Category",
        price: "Price",
        stock: "Stock",
        table: "Table",
        capacity: "Capacity",
        client: "Client",
        role: "Role",
        export: "Export",
        welcome: "Welcome",
        revenue: "Revenue",
        order_count: "Order Count",
        occupied_tables: "Occupied Tables"
    },
    ar: {
        dashboard: "لوحة التحكم",
        dishes: "الأطباق",
        orders: "الطلبات",
        tables: "الطاولات",
        reservations: "الحجوزات",
        employees: "الموظفين",
        logout: "تسجيل خروج",
        search: "بحث...",
        add: "إضافة",
        edit: "تعديل",
        delete: "حذف",
        save: "حفظ",
        cancel: "إلغاء",
        actions: "إجراءات",
        status: "الحالة",
        total: "المجموع",
        date: "التاريخ",
        category: "الفئة",
        price: "السعر",
        stock: "المحزون",
        table: "طاولة",
        capacity: "السعة",
        client: "العميل",
        role: "الدور",
        export: "تصدير",
        welcome: "مرحباً",
        revenue: "الإيرادات",
        order_count: "عدد الطلبات",
        occupied_tables: "طاولات مشغولة"
    }
};

// Initialisation
// Initialisation
// Force la mise à jour des données locale pour afficher les changements
localStorage.setItem('restaurantData', JSON.stringify(appData));

// ==================== AUTH & INIT ====================

function checkAuth() {
    // Simulation simple : si on est sur une page autre que login et pas "connecté"
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (window.location.pathname.includes('dashboard') || window.location.pathname === '/') {
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return false;
        }
    }
    return true;
}

function initApp() {
    if (!checkAuth()) return;
    initEvents();
    loadPage(currentPage);
    updateLanguage(localStorage.getItem('lang') || 'fr');
}

// ==================== ÉVÉNEMENTS ====================
function initEvents() {
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Sidebar navigation
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
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });

    // Language
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
        // Set initial value
        langSelect.value = localStorage.getItem('lang') || 'fr';
    }

    // Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalSave = document.getElementById('modalSave');

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);
    if (modalSave) modalSave.addEventListener('click', saveModal);

    // Export
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) exportBtn.addEventListener('click', exportData);
}

function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === 'admin' && p === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        const err = document.getElementById('errorMessage');
        err.textContent = 'Mot de passe incorrect. Veuillez réessayer.';
        err.style.display = 'block';
    }
}

// ==================== NAVIGATION & RENDERING ====================

function loadPage(page) {
    currentPage = page;
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    // Update Sidebar Active State
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    const activeLink = document.querySelector(`.sidebar-menu a[data-page="${page}"]`);
    if (activeLink) {
        activeLink.parentElement.classList.add('active');
    }

    // Update Title
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.setAttribute('data-key', page);

    switch (page) {
        case 'dashboard': contentArea.innerHTML = getDashboardContent(); setTimeout(initCharts, 50); break;
        case 'dishes': contentArea.innerHTML = getTableContent('dishes'); break;
        case 'orders': contentArea.innerHTML = getTableContent('orders'); break;
        case 'tables': contentArea.innerHTML = getTableContent('tables'); break;
        case 'reservations': contentArea.innerHTML = getTableContent('reservations'); break;
        case 'employees': contentArea.innerHTML = getTableContent('employees'); break;
    }

    updateLanguage(currentLang); // Re-apply translations to new content
}

function getDashboardContent() {
    // Calcul de KPI
    const totalRev = appData.orders.reduce((acc, o) => acc + (o.status === 'completed' ? o.total : 0), 0);
    const pendingOrders = appData.orders.filter(o => o.status === 'pending').length;
    const occupiedTables = appData.tables.filter(t => t.status === 'occupée').length;

    return `
    <div class="kpi-container">
        <div class="kpi-card">
            <div class="kpi-icon"><i class="fas fa-money-bill-wave"></i></div>
            <div class="kpi-content">
                <h3 data-key="revenue_val">${totalRev.toFixed(2)} DH</h3>
                <p data-key="revenue">Revenus</p>
            </div>
        </div>
        <div class="kpi-card">
             <div class="kpi-icon"><i class="fas fa-shopping-basket"></i></div>
            <div class="kpi-content">
                <h3>${pendingOrders}</h3>
                <p>Commandes en attente</p>
            </div>
        </div>
        <div class="kpi-card">
             <div class="kpi-icon"><i class="fas fa-chair"></i></div>
            <div class="kpi-content">
                <h3>${occupiedTables}</h3>
                <p data-key="occupied_tables">Tables occupées</p>
            </div>
        </div>
        <div class="kpi-card">
             <div class="kpi-icon"><i class="fas fa-users"></i></div>
            <div class="kpi-content">
                <h3>${appData.employees.length}</h3>
                <p data-key="employees">Employés</p>
            </div>
        </div>
    </div>
    
    <div class="charts-container">
        <div class="chart-card">
            <h3><i class="fas fa-chart-line"></i> <span data-key="orders_chart">Commandes/Heure</span></h3>
            <div class="chart-wrapper"><canvas id="ordersChart"></canvas></div>
        </div>
        <div class="chart-card">
            <h3><i class="fas fa-chart-pie"></i> <span data-key="dishes_chart">Répartition Plats</span></h3>
            <div class="chart-wrapper"><canvas id="dishesChart"></canvas></div>
        </div>
    </div>
    
    <div class="charts-container">
         <div class="chart-card">
            <h3><i class="fas fa-chart-bar"></i> Revenus Mensuels</h3>
            <div class="chart-wrapper"><canvas id="revenueChart"></canvas></div>
        </div>
        <div class="chart-card">
            <h3><i class="fas fa-table"></i> Statut Tables</h3>
            <div class="chart-wrapper"><canvas id="tablesChart"></canvas></div>
        </div>
    </div>
    
    <div class="charts-container">
        <div class="chart-card full-width">
             <h3><i class="fas fa-smile"></i> Satisfaction Client / Perf. Employés</h3>
            <div class="chart-wrapper"><canvas id="employeesChart"></canvas></div>
        </div>
    </div>
    `;
}

function getTableContent(type) {
    const data = appData[type];
    let headers = [];
    let rows = '';

    // Définition des colonnes selon le type (sans ID visible)
    if (type === 'dishes') headers = ['image', 'name', 'category', 'price', 'stock', 'actions'];
    if (type === 'orders') headers = ['table_id', 'status', 'total', 'date', 'actions'];
    if (type === 'tables') headers = ['number', 'capacity', 'status', 'actions'];
    if (type === 'reservations') headers = ['client', 'date', 'time', 'persons', 'status', 'actions'];
    if (type === 'employees') headers = ['name', 'role', 'email', 'phone', 'actions'];

    data.forEach(item => {
        rows += `<tr>`;
        headers.forEach(h => {
            if (h === 'actions') {
                rows += `
                <td class="actions-cell">
                    <button class="btn-action btn-edit" onclick="openModal('${type}', 'edit', ${item.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteItem('${type}', ${item.id})"><i class="fas fa-trash"></i></button>
                    <button class="btn-action btn-view" onclick="viewDetails('${type}', ${item.id})"><i class="fas fa-eye"></i></button>
                </td>`;
            } else if (h === 'image') {
                // Use image if available with fallback logic
                if (item.image) {
                    rows += `<td><div class="img-placeholder">
                        <img src="${item.image}" alt="${item.name}" class="dish-thumbnail" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <i class="fas fa-utensils" style="display:none; color: var(--text-muted);"></i>
                     </div></td>`;
                } else {
                    let iconClass = 'fa-utensils';
                    let colorStyle = '';
                    if (item.category === 'Pizza') {
                        iconClass = 'fa-pizza-slice';
                        colorStyle = 'color: #f97316;';
                    } else if (item.category === 'Burger') {
                        iconClass = 'fa-hamburger';
                    } else if (item.category === 'Dessert') {
                        iconClass = 'fa-ice-cream';
                    }
                    rows += `<td><div class="img-placeholder"><i class="fas ${iconClass}" style="${colorStyle}"></i></div></td>`;
                }
            } else {
                rows += `<td>${item[h] !== undefined ? item[h] : ''}</td>`;
            }
        });
        rows += `</tr>`;
    });

    // Header traduction keys maps
    const headerHtml = headers.map(h => `<th><span data-key="${h}">${h.toUpperCase()}</span></th>`).join('');

    return `
    <div class="table-card" style="margin-top: 20px;">
        <div class="table-tools">
             <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="searchInput" placeholder="Rechercher..." onkeyup="filterTable()">
            </div>
            <div class="export-buttons">
                <button class="btn-primary" onclick="openModal('${type}', 'add')">
                    <i class="fas fa-plus"></i> <span data-key="add">Ajouter</span>
                </button>
                <button class="btn-export btn-csv" onclick="exportData('csv')"><i class="fas fa-file-csv"></i> CSV</button>
                <button class="btn-export btn-pdf" onclick="exportData('pdf')"><i class="fas fa-file-pdf"></i> PDF</button>
            </div>
        </div>
        <div class="table-responsive">
            <table id="dataTable">
                <thead><tr>${headerHtml}</tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    </div>
    `;
}

// ==================== CHARTS (5 Types) ====================
function initCharts() {
    // 1. Line Chart: Commandes par heure (simulé)
    new Chart(document.getElementById('ordersChart'), {
        type: 'line',
        data: {
            labels: ['10h', '12h', '14h', '16h', '18h', '20h', '22h'],
            datasets: [{
                label: 'Commandes',
                data: [2, 12, 8, 4, 10, 15, 9],
                borderColor: '#667eea',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(102, 126, 234, 0.1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 2. Doughnut Chart: Répartition catégories
    const catCounts = {};
    appData.dishes.forEach(d => catCounts[d.category] = (catCounts[d.category] || 0) + 1);
    new Chart(document.getElementById('dishesChart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(catCounts),
            datasets: [{
                data: Object.values(catCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 3. Bar Chart: Revenus Mensuels (Simulé)
    new Chart(document.getElementById('revenueChart'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
            datasets: [{
                label: 'Revenus (DH)',
                data: [1200, 1500, 1100, 1800, 2000, 2200],
                backgroundColor: '#764ba2'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 4. PolarArea/Bar Chart: Statut des tables
    const tableStatus = { 'libre': 0, 'occupée': 0, 'réservée': 0 };
    appData.tables.forEach(t => tableStatus[t.status] = (tableStatus[t.status] || 0) + 1);
    new Chart(document.getElementById('tablesChart'), {
        type: 'bar', // Histogramme
        data: {
            labels: Object.keys(tableStatus),
            datasets: [{
                label: 'Tables',
                data: Object.values(tableStatus),
                backgroundColor: ['#48bb78', '#f56565', '#ed8936']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });

    // 5. Scatter Plot / Radar: Performance (Simulé)
    new Chart(document.getElementById('employeesChart'), {
        type: 'radar',
        data: {
            labels: ['Rapidité', 'Qualité', 'Service', 'Ponctualité', 'Travail équipe'],
            datasets: [{
                label: 'Moyenne Équipe',
                data: [85, 90, 80, 95, 88],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// ==================== CRUD LOGIC ====================

function openModal(type, action, id = null) {
    console.log("Opening modal:", type, action, id);
    currentModalType = type;
    currentEditId = id;
    const modal = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const footer = document.querySelector('.modal-footer');

    if (!modal || !title || !body) return;

    // Traduction du titre
    const typeLabel = translations[currentLang] && translations[currentLang][type] ? translations[currentLang][type] : type;
    title.textContent = (action === 'add' ? 'Ajouter' : 'Modifier') + ' ' + typeLabel;

    body.innerHTML = generateForm(type, id);

    // Restore footer with save button for add/edit
    if (footer) {
        footer.innerHTML = `
            <button id="modalCancel" onclick="closeModal()">Annuler</button>
            <button id="modalSave" onclick="saveModal()">Enregistrer</button>
    `;
    }

    // Style adjustments
    document.querySelectorAll('#crudForm .form-control').forEach(el => {
        el.style.width = "100%";
        el.style.padding = "0.75rem";
        el.style.marginBottom = "1rem";
        el.style.border = "1px solid #ddd";
        el.style.borderRadius = "0.5rem";
    });

    modal.classList.add('show');
}

function generateForm(type, id) {
    const item = id ? appData[type].find(i => i.id === id) : {};
    let fields = '';

    const input = (lbl, key, fType = 'text', val = '') => `
        <div class="form-group">
            <label>${lbl}</label>
            <input type="${fType}" id="field_${key}" value="${val !== undefined ? val : ''}" class="form-control" required>
        </div>`;

    if (type === 'dishes') {
        fields += input('Nom', 'name', 'text', item.name);
        fields += input('Catégorie', 'category', 'text', item.category);
        fields += input('Prix', 'price', 'number', item.price);
        fields += input('Stock', 'stock', 'number', item.stock);
    } else if (type === 'employees') {
        fields += input('Nom', 'name', 'text', item.name);
        fields += input('Rôle', 'role', 'text', item.role);
        fields += input('Email', 'email', 'email', item.email);
        fields += input('Téléphone', 'phone', 'text', item.phone);
    } else if (type === 'tables') {
        fields += input('Numéro', 'number', 'text', item.number);
        fields += input('Capacité', 'capacity', 'number', item.capacity);
        fields += input('Statut (libre/occupée/réservée)', 'status', 'text', item.status);
    } else if (type === 'orders') {
        // Improved inputs for orders
        fields += input('Numéro de Table', 'table_id', 'number', item.table_id);
        fields += input('Total (DH)', 'total', 'number', item.total);
        fields += input('Statut (pending/completed/served)', 'status', 'text', item.status);
    } else if (type === 'reservations') {
        fields += input('Client', 'client', 'text', item.client);
        fields += input('Table ID', 'table_id', 'number', item.table_id);
        fields += input('Date (YYYY-MM-DD)', 'date', 'date', item.date);
        fields += input('Heure', 'time', 'time', item.time);
        fields += input('Personnes', 'persons', 'number', item.persons);
        fields += input('Statut (confirmée/en attente/annulée)', 'status', 'text', item.status);
    } else {
        fields += `<p>Champs génériques:</p>`;
        fields += input('Nom / Titre', 'name', 'text', item.name);
    }

    return `<form id="crudForm" onsubmit="event.preventDefault(); saveModal();">${fields}</form>`;
}

function saveModal() {
    const type = currentModalType;
    const id = currentEditId;

    // Find or Create
    let newItem = id ? appData[type].find(i => i.id === id) : { id: Date.now() }; // Simple ID

    // Harvest data
    const inputs = document.querySelectorAll('#crudForm input');
    let hasError = false;

    inputs.forEach(inp => {
        if (!inp.value && inp.hasAttribute('required')) hasError = true;
        const key = inp.id.replace('field_', '');
        // Auto-convert numbers
        if (inp.type === 'number') {
            newItem[key] = parseFloat(inp.value) || 0;
        } else {
            newItem[key] = inp.value;
        }
    });

    if (hasError && !id) {
        alert("Veuillez remplir les champs obligatoires.");
        return;
    }

    if (!id) {
        // NEW Item
        if (!appData[type]) appData[type] = [];
        appData[type].push(newItem);
    } else {
        // Update: newItem is already the reference object from appData array due to .find()
        // If we created a copy, we would need to replace it. 
        // JS .find() returns reference to object in array. So updating props works.
        // But if I re-constructed 'newItem' as {} above, I broke it.
        // My code: let newItem = id ? ...find... : {};
        // Correct.
        if (id) {
            // If I replace keys on the reference, it updates the original.
            // However, let's just make sure we save the 'newItem' object back if it was a copy?
            // No, .find returns reference. Updating newItem.key updates the object in array.
        }
    }

    // Add Date for New Orders if missing
    if (type === 'orders' && !newItem.date) newItem.date = new Date().toISOString().split('T')[0];

    // AUTOMATIC STATUS UPDATES
    if (type === 'orders') {
        const table = appData.tables.find(t => t.id === newItem.table_id || t.id === parseInt(newItem.table_id));
        if (table && (newItem.status === 'pending' || newItem.status === 'served')) {
            table.status = 'occupée';
        }
    } else if (type === 'reservations') {
        const table = appData.tables.find(t => t.id === newItem.table_id || t.id === parseInt(newItem.table_id));
        if (table && newItem.status === 'confirmée') {
            table.status = 'réservée';
        }
    }

    localStorage.setItem('restaurantData', JSON.stringify(appData));
    closeModal();
    loadPage(currentPage);
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
}

function deleteItem(type, id) {
    if (confirm("Confirmer la suppression ?")) {
        appData[type] = appData[type].filter(i => i.id !== id);
        localStorage.setItem('restaurantData', JSON.stringify(appData));
        loadPage(currentPage);
    }
}

function viewDetails(type, id) {
    const item = appData[type].find(i => i.id === id);
    if (!item) return;

    // Build formatted details HTML
    let detailsHtml = '';
    const labels = {
        id: 'ID', name: 'Nom', category: 'Catégorie', price: 'Prix', stock: 'Stock',
        description: 'Description', status: 'Statut', total: 'Total', date: 'Date',
        time: 'Heure', client: 'Client', persons: 'Personnes', number: 'Numéro',
        capacity: 'Capacité', role: 'Rôle', email: 'Email', phone: 'Téléphone',
        shift: 'Horaire', salary: 'Salaire', table_id: 'Table'
    };

    for (let key in item) {
        if (key === 'image' || key === 'dishes') continue; // Skip non-displayable
        const label = labels[key] || key;
        let value = item[key];
        if (key === 'price' || key === 'total' || key === 'salary') value = value + ' DH';
        detailsHtml += `
        < div class="detail-row" >
                <span class="detail-label">${label}</span>
                <span class="detail-value">${value}</span>
            </div > `;
    }

    // Use the existing modal
    const modal = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const footer = document.querySelector('.modal-footer');

    title.textContent = `📋 Détails - ${translations[currentLang][type] || type} `;
    body.innerHTML = `< div class="details-card" > ${detailsHtml}</div > `;

    // Hide save button, show only close
    if (footer) {
        footer.innerHTML = `< button id = "modalCancel" onclick = "closeModal()" > Fermer</button > `;
    }

    modal.classList.add('show');
}

// ==================== FEATURES UTILS ====================

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateLanguage(lang);

    // Gestion RTL pour l'Arabe
    if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.classList.remove('rtl');
        document.body.setAttribute('dir', 'ltr');
    }
}

function updateLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        } else if (translations[lang] && translations[lang][key.toLowerCase()]) {
            el.textContent = translations[lang][key.toLowerCase()];
        }
    });
}

function exportData(format) {
    const data = appData[currentPage];
    if (!data || data.length === 0) {
        alert("Aucune donnée à exporter.");
        return;
    }

    // Define columns for each type
    let columns = [];
    let title = "";
    if (currentPage === 'dishes') {
        columns = ['name', 'category', 'price', 'stock', 'description'];
        title = "Menu des Plats";
    } else if (currentPage === 'orders') {
        columns = ['id', 'table_id', 'status', 'total', 'date'];
        title = "Liste des Commandes";
    } else if (currentPage === 'tables') {
        columns = ['number', 'capacity', 'status'];
        title = "Liste des Tables";
    } else if (currentPage === 'reservations') {
        columns = ['client', 'date', 'time', 'persons', 'status'];
        title = "Liste des Réservations";
    } else if (currentPage === 'employees') {
        columns = ['name', 'role', 'email', 'phone', 'shift', 'salary'];
        title = "Liste des Employés";
    }

    if (format === 'csv') {
        // Generate CSV
        let csv = columns.map(c => c.toUpperCase()).join(';') + '\n';
        data.forEach(item => {
            csv += columns.map(col => {
                let val = item[col] !== undefined ? item[col] : '';
                // Escape special chars
                if (typeof val === 'string' && val.includes(';')) val = '"' + val + '"';
                return val;
            }).join(';') + '\n';
        });

        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }); // BOM for Excel
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export_${currentPage}_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.csv`;
        a.click();
        URL.revokeObjectURL(url);

    } else if (format === 'pdf') {
        // Generate styled HTML for print/PDF
        let html = `
        < !DOCTYPE html >
            <html>
                <head>
                    <meta charset="UTF-8">
                        <title>${title}</title>
                        <style>
                            body {font - family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: #fff; }
                            h1 {color: #1e293b; border-bottom: 3px solid #10b981; padding-bottom: 10px; }
                            .info {color: #64748b; margin-bottom: 20px; }
                            table {width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th {background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 12px; text-align: left; }
                            td {padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
                            tr:nth-child(even) {background: #f8fafc; }
                            tr:hover {background: #e2e8f0; }
                            .footer {margin - top: 30px; text-align: center; color: #94a3b8; font-size: 12px; }
                            @media print {body {padding: 20px; } }
                        </style>
                </head>
                <body>
                    <h1>🍽️ ${title}</h1>
                    <p class="info">Exporté le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
                    <table>
                        <thead><tr>${columns.map(c => '<th>' + c.toUpperCase() + '</th>').join('')}</tr></thead>
                        <tbody>
                            `;
        data.forEach(item => {
            html += '<tr>' + columns.map(col => '<td>' + (item[col] !== undefined ? item[col] : '-') + '</td>').join('') + '</tr>';
        });
        html += `
                        </tbody>
                    </table>
                    <div class="footer">Restaurant Manager - Document généré automatiquement</div>
                    <script>window.print();</script>
                </body>
            </html>`;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();
    }
}

function filterTable() {
    const filter = document.getElementById('searchInput').value.toUpperCase();
    const rows = document.getElementById('dataTable').getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        let txtValue = rows[i].textContent || rows[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('login.html')) {
        initEvents();
    } else {
        initApp();
    }
});
window.openModal = openModal;
window.closeModal = closeModal;
window.saveModal = saveModal;
window.deleteItem = deleteItem;
window.viewDetails = viewDetails;
window.exportData = exportData;
window.filterTable = filterTable;