Voici une explication complète du code de tous les fichiers de votre projet de système de gestion de restaurant "Restaurant Tilila". Le projet est une application web complète avec authentification, tableau de bord, et gestion CRUD (Créer, Lire, Modifier, Supprimer) pour les plats, commandes, tables, réservations et employés.

## 1. **login.html** - Page de connexion
Cette page HTML fournit l'interface de connexion pour accéder au système.

**Structure principale :**
- **DOCTYPE et balises HTML** : Document HTML5 en français
- **Section `<head>`** : Métadonnées, titre, liens vers CSS externes (style.css, Font Awesome, Google Fonts) et Chart.js
- **Corps (`<body>`)** :
  - Conteneur de connexion avec carte stylisée
  - Logo avec icône et titre
  - Formulaire avec champs utilisateur/mot de passe
  - Bouton de connexion
  - Message d'erreur
  - Informations sur les identifiants par défaut (admin/admin)
  - Pied de page
- **Script** : Lien vers `script.js`

**Fonctionnalités :** Interface responsive avec fond d'image, validation côté client, et redirection vers le tableau de bord après connexion réussie.

## 2. **dashboard.html** - Tableau de bord principal
Page principale après connexion, affichant les statistiques et permettant la navigation.

**Structure :**
- **Navigation (`<nav>`)** : Barre supérieure avec logo, sélecteur de langue, bouton déconnexion
- **Conteneur principal** : Layout en deux colonnes (sidebar + contenu)
- **Sidebar** : Menu de navigation avec icônes pour chaque section (Tableau de bord, Plats, Commandes, etc.)
- **Contenu principal** : Zone dynamique chargée par JavaScript
- **Modal** : Fenêtre popup pour les opérations CRUD
- **Scripts** : Liens vers `script.js` et Chart.js

**Fonctionnalités :** Navigation latérale, modales pour CRUD, support multilingue (Français/Anglais/Arabe), export de données.

## 3. **data.json** - Données du système
Fichier JSON contenant toutes les données simulées du restaurant.

**Structure des données :**
- **dishes** : Liste des plats avec id, nom, catégorie, prix, stock, description, image
- **orders** : Commandes avec id, table, plats, montant, statut, date
- **tables** : Tables avec numéro, capacité, statut
- **reservations** : Réservations avec client, table, date/heure, nombre de personnes, statut
- **employees** : Employés avec nom, rôle, email, téléphone, salaire, etc.

**Utilisation :** Ces données sont chargées en mémoire par JavaScript et utilisées pour afficher les tableaux et graphiques.

## 4. **script.js** - Logique JavaScript (846 lignes)
Fichier principal contenant toute la logique de l'application.

**Variables globales :**
- `currentPage` : Page actuelle affichée
- `currentModalType` : Type de modal ouvert
- `currentEditId` : ID de l'élément en cours d'édition
- `currentLang` : Langue actuelle
- `appData` : Données du restaurant (chargées depuis data.json)

**Fonctions principales :**

### Authentification
- `checkAuth()` : Vérifie si l'utilisateur est connecté
- `handleLogin()` : Traite la soumission du formulaire de connexion
- `initApp()` : Initialise l'application après connexion

### Navigation et affichage
- `loadPage(page)` : Charge le contenu d'une page spécifique
- `getDashboardContent()` : Génère le HTML du tableau de bord avec KPIs et graphiques
- `getTableContent(type)` : Génère les tableaux pour chaque section (plats, commandes, etc.)

### CRUD Operations
- `openModal(type, action, id)` : Ouvre une modale pour ajouter/modifier
- `generateForm(type, id)` : Génère dynamiquement les formulaires selon le type
- `saveModal()` : Sauvegarde les modifications
- `deleteItem(type, id)` : Supprime un élément
- `viewDetails(type, id)` : Affiche les détails d'un élément

### Graphiques (avec Chart.js)
- `initCharts()` : Initialise 5 types de graphiques :
  - Ligne : Commandes par heure
  - Doughnut : Répartition des plats par catégorie
  - Barres : Revenus mensuels
  - Barres : Statut des tables
  - Radar : Performance des employés

### Fonctionnalités supplémentaires
- `changeLanguage(lang)` : Change la langue de l'interface
- `exportData(format)` : Exporte les données en CSV ou PDF
- `filterTable()` : Filtre les tableaux par recherche
- `updateLanguage(lang)` : Met à jour les textes selon la langue

**Événements :** Gestion des clics sur la sidebar, modales, boutons d'export, etc.

## 5. **style.css** - Feuilles de style (965 lignes)
Feuille de style complète utilisant CSS variables et design moderne.

**Variables CSS :**
- Couleurs : `--primary`, `--accent`, `--bg-body`, etc.
- Ombres : `--shadow-sm`, `--shadow-lg`, etc.
- Espacement et rayons : `--radius-md`, etc.
- Transitions : `--transition-normal`

**Sections principales :**

### Layout général
- Reset CSS et styles de base
- Fond d'écran avec overlay pour lisibilité
- Typographie avec police Inter

### Composants
- **Boutons** : Styles pour `.btn-primary`, `.btn-secondary`, etc.
- **Page de connexion** : Fond avec image, carte centrée, animations
- **Navigation** : Barre supérieure avec blur effect
- **Sidebar** : Menu latéral avec effets hover et actif
- **Contenu principal** : Layout flexible

### Éléments spécifiques
- **KPIs** : Cartes avec icônes et statistiques
- **Graphiques** : Conteneurs pour Chart.js
- **Tableaux** : Styles responsives avec hover effects
- **Actions** : Boutons modifier/supprimer avec couleurs
- **Modales** : Overlay avec blur, animations d'ouverture
- **Formulaires** : Champs stylisés avec focus states

### Responsive Design
- Media queries pour tablettes et mobiles
- Tables transformées en cartes sur mobile
- Sidebar cachée sur mobile avec bouton toggle

**Thèmes :** Design moderne avec gradients, ombres, et effets de hover. Support RTL pour l'arabe.

## Architecture générale
- **Frontend uniquement** : Pas de backend, données stockées en localStorage
- **SPA-like** : Navigation sans rechargement de page
- **Multilingue** : Support français, anglais, arabe
- **Responsive** : Fonctionne sur desktop et mobile
- **CRUD complet** : Toutes les opérations de base sur les entités
- **Visualisations** : Graphiques interactifs avec Chart.js
- **Export** : Données exportables en CSV/PDF

Ce système fournit une interface complète pour gérer un restaurant, avec authentification, statistiques en temps réel, et gestion opérationnelle. Les données sont persistées localement via localStorage.