# Fonctionnement du Site - Restaurant Tilila

## Vue d'ensemble
Restaurant Tilila est un système de gestion complet pour restaurant, développé en HTML/CSS/JavaScript pur. Il offre une interface web moderne pour gérer tous les aspects opérationnels d'un restaurant : plats, commandes, tables, réservations et employés.

## Architecture Technique
- **Frontend uniquement** : Pas de serveur backend, toutes les données sont stockées localement
- **Persistance** : Utilisation de localStorage pour sauvegarder les données
- **Bibliothèques** : Chart.js pour les graphiques, Font Awesome pour les icônes
- **Responsive** : Fonctionne sur desktop, tablette et mobile
- **Multilingue** : Support français, anglais et arabe

## Parcours Utilisateur

### 1. Connexion
- **Page d'accueil** : `login.html`
- **Identifiants** : admin/admin (affichés sur la page)
- **Validation** : Côté client uniquement
- **Redirection** : Vers `dashboard.html` après connexion réussie
- **Session** : Stockée dans localStorage (`isLoggedIn`)

### 2. Tableau de Bord
- **Page principale** : `dashboard.html`
- **Éléments affichés** :
  - Barre de navigation supérieure (logo, langue, déconnexion)
  - Menu latéral avec navigation
  - Zone de contenu dynamique
  - Modales pour les opérations

## Sections du Système

### 1. Tableau de Bord (Dashboard)
**Affichage automatique au chargement**
- **KPIs (Indicateurs Clés)** :
  - Chiffre d'affaires total (calculé des commandes complétées)
  - Nombre de commandes en attente
  - Nombre de tables occupées
  - Nombre total d'employés
- **Graphiques interactifs** :
  - Commandes par heure (graphique en ligne)
  - Répartition des plats par catégorie (camembert)
  - Revenus mensuels (histogramme)
  - Statut des tables (histogramme)
  - Performance des employés (radar)

### 2. Gestion des Plats (Menu)
- **Affichage** : Tableau avec image, nom, catégorie, prix, stock
- **Actions** :
  - Ajouter un nouveau plat
  - Modifier un plat existant
  - Supprimer un plat
  - Voir les détails
- **Filtres** : Recherche en temps réel
- **Export** : CSV ou PDF

### 3. Gestion des Commandes
- **Affichage** : Tableau avec numéro table, statut, total, date
- **Actions CRUD** : Ajouter, modifier, supprimer, voir détails
- **Statuts** : pending, completed, served, cancelled
- **Impact automatique** : Changement du statut des tables selon les commandes

### 4. Gestion des Tables
- **Affichage** : Numéro, capacité, statut
- **Statuts** : libre, occupée, réservée
- **Actions** : Modifier le statut, voir détails

### 5. Gestion des Réservations
- **Affichage** : Client, date/heure, nombre de personnes, statut
- **Actions CRUD** : Gérer les réservations
- **Impact automatique** : Réservation confirmée = table réservée

### 6. Gestion des Employés
- **Affichage** : Nom, rôle, email, téléphone
- **Actions** : Gérer le personnel
- **Rôles** : Chef, Serveur, Barman, Manager, Plongeur

## Fonctionnalités Avancées

### 1. Navigation Dynamique
- **Menu latéral** : Clic sur une section charge le contenu sans recharger la page
- **Indicateur actif** : Section actuelle mise en évidence
- **Responsive** : Menu caché sur mobile avec bouton toggle

### 2. Opérations CRUD
- **Modales** : Fenêtres popup pour ajouter/modifier
- **Formulaires dynamiques** : Champs adaptés selon le type d'entité
- **Validation** : Champs requis vérifiés
- **Sauvegarde automatique** : Données stockées en localStorage
- **Mises à jour liées** : Modifications d'une entité impactent les autres (ex: commande → statut table)

### 3. Recherche et Filtrage
- **Barre de recherche** : Filtre en temps réel dans les tableaux
- **Case insensitive** : Recherche insensible à la casse

### 4. Export de Données
- **Formats** : CSV et PDF
- **Contenu** : Toutes les données de la section actuelle
- **CSV** : Téléchargement direct avec BOM pour Excel
- **PDF** : Génération HTML stylisée et impression automatique

### 5. Multilinguisme
- **Langues** : Français, Anglais, Arabe
- **Sélecteur** : Dans la barre de navigation
- **Direction** : RTL automatique pour l'arabe
- **Persistance** : Langue sauvegardée dans localStorage

### 6. Interface Responsive
- **Desktop** : Layout complet avec sidebar visible
- **Tablette** : Adaptation des grilles
- **Mobile** :
  - Tables transformées en cartes
  - Sidebar cachée par défaut
  - Boutons adaptés à l'écran tactile

## Gestion des Données

### Stockage
- **localStorage** : Persistance des données côté client
- **Structure** : Objet JavaScript avec arrays pour chaque entité
- **Synchronisation** : Mise à jour automatique après chaque modification

### Relations entre Entités
- **Commandes ↔ Tables** : Une commande occupe une table
- **Réservations ↔ Tables** : Une réservation réserve une table
- **Commandes ↔ Plats** : Une commande contient plusieurs plats
- **Employés** : Entité indépendante

### Calculs Automatiques
- **Chiffre d'affaires** : Somme des commandes complétées
- **Statuts des tables** : Mis à jour selon commandes/réservations
- **IDs** : Génération automatique (timestamp)

## Sécurité et Limitations
- **Authentification simple** : Un seul compte admin
- **Pas de chiffrement** : Données en clair dans localStorage
- **Pas de validation serveur** : Tout côté client
- **Pas de sauvegarde cloud** : Données perdues si navigateur vidé

## Flux de Données
1. **Chargement initial** : Données depuis `data.json` vers `appData`
2. **Modifications** : Via modales → validation → sauvegarde localStorage
3. **Affichage** : `appData` → génération HTML → DOM
4. **Export** : `appData` → format CSV/PDF → téléchargement

## Performance
- **Chargement initial** : Rapide (pas de requêtes serveur)
- **Navigation** : Instantanée (contenu généré côté client)
- **Graphiques** : Rendus avec Chart.js
- **Responsive** : CSS adaptatif sans JavaScript complexe

## Maintenance et Évolutivité
- **Code modulaire** : Fonctions séparées pour chaque fonctionnalité
- **Événements centralisés** : Gestion dans `initEvents()`
- **Traductions externes** : Objet `translations` facile à étendre
- **Styles cohérents** : Variables CSS pour thème uniforme

Ce système offre une solution complète et moderne pour la gestion d'un restaurant, avec une interface intuitive et des fonctionnalités avancées, tout en restant simple à déployer et maintenir.