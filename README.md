# 🏠 Maison de Passage Mutama - Site Web

Un site web moderne et responsif pour la Maison de Passage Mutama avec intégration complète des APIs.

## 📁 Structure du Projet

```
mutama-website/
├── index.html                 # Page d'accueil principale
├── reservation.html           # Page de réservation
├── galerie.html              # Page galerie complète
├── contact.html              # Page de contact
├── assets/
│   ├── images/               # Dossier images
│   │   ├── hero/            # Images hero
│   │   ├── presentation/    # Images présentation
│   │   └── testimonials/    # Images témoignages
│   └── js/
│       ├── api.js           # Module pour les appels API
│       ├── main.js          # Logique principale de l'app
│       └── animation.js     # Animations et transitions
├── components/              # Composants réutilisables
│   ├── header.html
│   ├── footer.html
│   ├── chambre-card.html
│   └── maison-card.html
└── README.md               # Ce fichier
```

## 🚀 Fonctionnalités Principales

### 1. **Page d'Accueil (index.html)**
- ✅ Hero animé avec texte progressif
- ✅ Section présentation avec 5 valeurs clés
- ✅ Affichage dynamique des appartements et chambres
- ✅ Galerie avec 4 images
- ✅ Témoignages clients
- ✅ Formulaire de réservation rapide
- ✅ Section contact avec coordonnées
- ✅ Footer avec liens rapides

### 2. **Page de Réservation (reservation.html)**
- ✅ Sélection d'appartement et chambre
- ✅ Choix des dates d'arrivée/départ
- ✅ Calcul automatique du prix total
- ✅ Formulaire d'informations personnelles
- ✅ Résumé de réservation en temps réel
- ✅ Validation des données

### 3. **Page Galerie (galerie.html)**
- ✅ Grid responsive avec toutes les images
- ✅ Filtrage par catégorie (Chambres, Appartements)
- ✅ Lightbox pour agrandissement des images
- ✅ Chargement lazy des images
- ✅ Animations au survol

### 4. **Page Contact (contact.html)**
- ✅ Formulaire de contact complet
- ✅ Informations de contact
- ✅ Horaires d'ouverture
- ✅ FAQ avec 6 questions fréquentes
- ✅ Assistance d'urgence

## 🔌 Intégration des APIs

### API Configuration
The API base URL is centrally configured in `public/assets/js/config.js`.

- **Current Base URL**: `https://severinhouse.bi/api/`

1. /appartment  - Récupère tous les appartements
2. /room       - Récupère toutes les chambres
3. /post       - Récupère les posts/témoignages
4. /file       - Récupère tous les fichiers/images

### Utilisation dans le Code

```javascript
// Charger toutes les données
const data = await API.loadAllData();

// Ou charger séparément
const apartments = await API.getApartments();
const rooms = await API.getRooms();
const posts = await API.getPosts();
const files = await API.getFiles();
```

## 🎨 Design & Styling

- **Framework CSS**: Tailwind CSS v3 (CDN)
- **Palette Couleurs**:
  - Primaire: Amber (#d97706)
  - Texte: Gray-900
  - Fond: Gray-50
- **Police**: Poppins (texte), Playfair Display (titres)
- **Icons**: Font Awesome 6.4.0
- **Responsiveness**: Mobile-first, adapté pour mobile, tablette, desktop

## ⚡ Animations

- **Hero**: Texte qui s'affiche progressivement
- **Cards**: Effet lift au survol
- **Scroll**: Parallax sur le hero
- **Galerie**: Zoom au survol, lightbox fluide
- **Transitions**: Smooth scroll, fade-in au chargement

## 📱 Responsive Design

- **Mobile** (< 768px): Stack vertical, menu hamburger
- **Tablette** (768px - 1024px): 2 colonnes
- **Desktop** (> 1024px): 3+ colonnes

## 🔧 Configuration

### Modifier les coordonnées
Éditez ces fichiers pour mettre à jour les informations de contact:
- Téléphone: `+257 61 XXX XXX`
- Email: `info@mutama.bi`
- Adresse: `Bujumbura, Burundi`

### Personnaliser les couleurs
Modifiez dans les fichiers HTML:
```html
bg-amber-600  <!-- Couleur primaire -->
text-gray-900 <!-- Texte principal -->
```

### Ajouter des images
Placez les images dans `assets/images/` et référencez-les dans les APIs ou en dur dans les fichiers HTML.

## 🎯 Utilisation

### Lancement local
1. Ouvrez `index.html` dans votre navigateur
2. Assurez-vous d'avoir une connexion Internet (APIs externes et CDN Tailwind)

### Déploiement
1. Uploadez tous les fichiers sur votre serveur web
2. Assurez-vous que les URLs des APIs sont accessibles
3. Testez sur différents appareils

## 📋 Checklist Fonctionnalités

### Page Accueil
- [x] Header avec navigation
- [x] Hero avec animation
- [x] Section présentation
- [x] Affichage dynamique des maisons
- [x] Affichage des chambres par maison
- [x] Galerie (4 images)
- [x] Témoignages
- [x] Formulaire réservation rapide
- [x] Contact
- [x] Footer

### Page Réservation
- [x] Sélection appartement/chambre
- [x] Sélection dates
- [x] Calcul prix
- [x] Formulaire contact
- [x] Résumé réservation

### Page Galerie
- [x] Grid responsive
- [x] Filtres par catégorie
- [x] Lightbox
- [x] Lazy loading

### Page Contact
- [x] Formulaire contact
- [x] Informations de contact
- [x] Horaires
- [x] FAQ

## 🔐 Sécurité

- ✅ HTTPS pour les APIs
- ✅ Validation des formulaires côté client
- ✅ Protection CSRF (à implémenter côté serveur)
- ✅ Pas de données sensibles en localStorage

## 📊 Performance

- ✅ Images lazy-loaded
- ✅ Minification CSS (Tailwind)
- ✅ Async JavaScript
- ✅ Cache des données API

## 🐛 Dépannage

### Les images ne s'affichent pas
- Vérifiez que l'URL de l'API est correcte
- Vérifiez les URLs des images dans la réponse API
- Assurez-vous d'avoir une connexion Internet

### Le formulaire ne soumet pas
- Vérifiez que tous les champs obligatoires sont remplis
- Consultez la console JavaScript pour les erreurs

### Les styles ne s'appliquent pas
- Vérifiez que vous avez une connexion Internet (Tailwind CDN)
- Actualisez la page (Ctrl+F5)
- Videz le cache du navigateur

## 📝 Licence

© 2024 Maison de Passage Mutama. Tous droits réservés.

## 👨‍💼 Support

Pour toute question ou assistance:
- 📞 +257 61 XXX XXX
- 📧 info@mutama.bi
- 📍 Bujumbura, Burundi

---

**Version**: 1.0.0  
**Dernière mise à jour**: 23 Janvier 2024"# matama-website" 
