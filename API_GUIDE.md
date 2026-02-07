# 🔌 GUIDE COMPLET - INTÉGRATION DES APIs MUTAMA

## 📋 TABLE DES MATIÈRES
1. [Vue d'ensemble](#vue-densemble)
2. [Structure des APIs](#structure-des-apis)
3. [Utilisation dans le Frontend](#utilisation-dans-le-frontend)
4. [Affichage des Images](#affichage-des-images)
5. [Dépannage](#dépannage)

---

## 🔍 VUE D'ENSEMBLE

### URLs des APIs

```javascript
const API_BASE_URL = 'https://capbio.bi/mutama/api';

// Les 4 endpoints disponibles :
GET /appartment   → Tous les appartements
GET /room         → Toutes les chambres  
GET /post         → Tous les posts (témoignages)
GET /file         → Tous les fichiers (images)
```

### Module API (assets/js/api.js)

Le fichier `api.js` contient toutes les méthodes pour récupérer les données :

```javascript
// Récupérer chaque ressource
API.getApartments()  → Promise<Array>
API.getRooms()       → Promise<Array>
API.getPosts()       → Promise<Array>
API.getFiles()       → Promise<Array>

// Charger tout en une fois
API.loadAllData()    → Promise<Object>

// Utilitaires
API.getImageUrl(item, filesList)  → String
API.getAllImages(apartments, rooms, posts, files) → Array
```

---

## 📊 STRUCTURE DES APIs

### 1️⃣ API Appartements `/appartment`

**Structure de réponse attendue :**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Appartement Luxe",
      "description": "Description...",
      "image": "url-image",
      "photo": "url-photo",
      "details": "Détails...",
      "created_at": "2024-01-23"
    }
  ]
}
```

**Ou tableau direct :**

```json
[
  {
    "id": 1,
    "name": "Appartement Luxe",
    ...
  }
]
```

**Champs reconnus :**
- `id` - Identifiant unique (requis)
- `name` ou `title` - Nom de l'appartement
- `description` ou `details` - Description complète
- `image` ou `photo` - URL de l'image principale
- `created_at` ou `date` - Date de création

---

### 2️⃣ API Chambres `/room`

**Structure de réponse :**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Chambre Déluxe",
      "title": "Chambre Déluxe",
      "description": "Description...",
      "image": "url-image",
      "photo": "url-photo",
      "price": 50000,
      "prix": 50000,
      "prixParNuit": 50000,
      "price_per_night": 50000,
      "amenities": "WiFi, Climatisation, TV",
      "equipements": "WiFi, Climatisation, TV",
      "features": "WiFi, Climatisation, TV",
      "appartmentId": 1,
      "appartment_id": 1,
      "apartmentId": 1
    }
  ]
}
```

**Champs reconnus :**
- `id` - Identifiant unique (requis)
- `name` ou `title` - Nom de la chambre
- `description` ou `details` - Description
- `image` ou `photo` - Image de la chambre
- `price`, `prix`, `prixParNuit`, `price_per_night` - Prix par nuit
- `amenities`, `equipements`, `features` - Équipements (séparés par virgule)
- `appartmentId`, `appartment_id`, `apartmentId` - ID de l'appartement parent

---

### 3️⃣ API Posts `/post`

**Structure de réponse :**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Excellent séjour",
      "content": "C'était magnifique...",
      "message": "C'était magnifique...",
      "description": "C'était magnifique...",
      "text": "C'était magnifique...",
      "author": "Jean Dupont",
      "name": "Jean Dupont",
      "client": "Jean Dupont",
      "rating": 5,
      "note": 5,
      "stars": 5,
      "image": "url-image",
      "photo": "url-photo",
      "heroImage": "url-hero-image",
      "date": "2024-01-23",
      "created_at": "2024-01-23"
    }
  ]
}
```

**Champs reconnus :**
- `id` - Identifiant unique (requis)
- `title` - Titre du post
- `content`, `message`, `description`, `text` - Contenu du témoignage
- `author`, `name`, `client` - Auteur du témoignage
- `rating`, `note`, `stars` - Notation (1-5)
- `image`, `photo` - Image du post
- `heroImage` - Image large du post
- `date`, `created_at` - Date du post

---

### 4️⃣ API Fichiers `/file`

**Structure de réponse :**

```json
{
  "data": [
    {
      "id": 1,
      "name": "image-chambre.jpg",
      "url": "uploads/images/image-chambre.jpg",
      "path": "uploads/images/image-chambre.jpg",
      "type": "image/jpeg",
      "size": 2048576,
      "created_at": "2024-01-23"
    }
  ]
}
```

**Champs reconnus :**
- `id` - Identifiant unique
- `name` - Nom du fichier
- `url` ou `path` - Chemin/URL du fichier
- `type` - Type MIME du fichier
- `size` - Taille du fichier

---

## 🎯 UTILISATION DANS LE FRONTEND

### Dans index.html

Le script chargé automatiquement au démarrage :

```html
<script src="assets/js/api.js"></script>
<script src="assets/js/main.js"></script>
```

**Flux d'exécution :**

```
Page load → main.js → DOMContentLoaded → initApp() → API.loadAllData()
   ↓
API récupère les 4 endpoints en parallèle
   ↓
displayApartmentsWithRooms() → Affiche avec les chambres
   ↓
displayGallery() → Affiche 4 premières images
   ↓
displayTestimonials() → Affiche les posts
```

---

## 📷 AFFICHAGE DES IMAGES

### Récupération des Images

Le module API récupère automatiquement toutes les images :

```javascript
// Récupérer l'image d'une entité
const imageUrl = API.getImageUrl(apartment, filesList);

// Récupérer TOUTES les images
const allImages = API.getAllImages(apartments, rooms, posts, files);
```

### Format des Images Supportées

```javascript
// Chemins absolus (HTTP/HTTPS)
item.image = "https://example.com/image.jpg"

// Chemins relatifs (construits automatiquement)
item.image = "uploads/images/image.jpg"
// Devient : "https://capbio.bi/mutama/api/uploads/images/image.jpg"
```

### Affichage avec Fallback

Les images ont des fallbacks automatiques :

```html
<img src="${roomImage}" 
     alt="Room" 
     onerror="this.src='${API.getDefaultImage()}'">
```

Si l'image ne charge pas → Image par défaut affichée

---

## 📊 DONNÉES CHARGÉES

### Structure du Résultat `loadAllData()`

```javascript
{
  apartments: [],   // Array d'appartements
  rooms: [],        // Array de chambres
  posts: [],        // Array de posts/témoignages
  files: [],        // Array de fichiers
  allImages: []     // Array de TOUTES les images trouvées
}
```

### Exemple d'Utilisation

```javascript
async function initApp() {
  const allData = await API.loadAllData();
  
  console.log('Appartements:', allData.apartments.length);
  console.log('Chambres:', allData.rooms.length);
  console.log('Posts:', allData.posts.length);
  console.log('Images totales:', allData.allImages.length);
  
  // Utiliser les données
  displayApartments(allData.apartments);
  displayRooms(allData.rooms);
}
```

---

## 🔗 RELATIONS ENTRE DONNÉES

### Appartement → Chambres

```javascript
// Trouver les chambres d'un appartement
const apartmentRooms = allData.rooms.filter(room => {
  const roomAptId = room.appartmentId || room.appartment_id || room.apartmentId;
  return roomAptId == apartment.id;
});
```

**Champs de liaison :**
- `room.appartmentId`
- `room.appartment_id`
- `room.apartmentId`

Doit correspondre à `apartment.id`

---

## 🧪 TESTER LES APIs

### Page de Test Dédiée

Ouvrez **[test-api.html](test-api.html)** pour :
- ✅ Vérifier que toutes les APIs répondent
- ✅ Voir le nombre d'éléments retournés
- ✅ Afficher les données brutes
- ✅ Mesurer les temps de réponse

```
http://localhost:8000/test-api.html
```

### Console du Navigateur

Ouvrez F12 et exécutez :

```javascript
// Charger les données
API.loadAllData().then(data => {
  console.log('Données complètes:', data);
  console.log('Apartements:', data.apartments);
  console.log('Chambres:', data.rooms);
  console.log('Posts:', data.posts);
  console.log('Fichiers:', data.files);
});

// Récupérer une image
API.getImageUrl(data.apartments[0]);

// Obtenir toutes les images
API.getAllImages(data.apartments, data.rooms, data.posts, data.files);
```

---

## 🛠️ GESTION DES ERREURS

### Erreurs Réseau

Si une API ne répond pas :

```javascript
try {
  const data = await API.getApartments();
  if (!data || data.length === 0) {
    console.warn('Aucun appartement disponible');
    // Afficher un message à l'utilisateur
  }
} catch (error) {
  console.error('Erreur API:', error);
  // Fallback à des données vides
}
```

### Images Manquantes

Les images ont des fallbacks automatiques :

```javascript
// Si l'URL n'est pas accessible
<img src="${imageUrl}" 
     onerror="this.src='${API.getDefaultImage()}'">
```

L'image par défaut est sélectionnée aléatoirement parmi :
- https://images.unsplash.com/photo-1502672260266-1c1ef2d93688
- https://images.unsplash.com/photo-1631049307264-da0ec9d70304
- https://images.unsplash.com/photo-1522708323590-d24dbb6b0267

---

## 📝 LOGS DISPONIBLES

Le code écrit des logs dans la console :

```javascript
📥 Récupération des appartements...
✅ Appartements chargés: 5

📥 Récupération des chambres...
✅ Chambres chargées: 15

📥 Récupération des posts...
✅ Posts chargés: 8

📥 Récupération des fichiers...
✅ Fichiers chargés: 42

🔄 Chargement de toutes les données...
✅ Données chargées en 234.56ms
   📊 Résumé: 5 apt, 15 chambres, 8 posts, 42 fichiers

📷 Total images trouvées: 65
```

---

## 🎨 AFFICHAGE PAR PAGE

### index.html (Accueil)

- ✅ **Maisons & Chambres** : Tous les appartements + leurs chambres
- ✅ **Galerie** : 4 premières images (héroImages des posts + images des chambres)
- ✅ **Témoignages** : 3 premiers posts
- ✅ **Réservation rapide** : Sélecteurs remplis dynamiquement

### galerie.html (Galerie Complète)

- ✅ **Grille** : TOUTES les images trouvées (posts, chambres, appartements, fichiers)
- ✅ **Filtres** : 
  - Tous les images
  - Chambres seulement
  - Appartements/Posts seulement
- ✅ **Lightbox** : Agrandissement des images

### reservation.html (Réservation)

- ✅ **Sélecteurs** : Remplis depuis les APIs
- ✅ **Prix** : Affichés depuis les données de chambre
- ✅ **Calcul** : Automatique selon les dates

### contact.html (Contact)

- ✅ **FAQ** : Statique (à améliorer si besoin)
- ✅ **Formulaires** : Gestion locale

---

## 🔐 SÉCURITÉ & CORS

### Configuration CORS

Les APIs doivent permettre les requêtes du domaine du site :

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Vérification dans le Code

```javascript
// Vérifié automatiquement par fetch()
fetch(url)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .catch(error => console.error('CORS ou erreur réseau:', error));
```

---

## 📈 PERFORMANCE

### Optimisations Implémentées

✅ **Chargement en Parallèle**
```javascript
const [apt, rooms, posts, files] = await Promise.all([
  API.getApartments(),
  API.getRooms(),
  API.getPosts(),
  API.getFiles()
]);
```

✅ **Lazy Loading des Images**
```html
<img src="..." loading="lazy">
```

✅ **Cache Navigateur**
- Fetch utilise le cache HTTP par défaut
- LocalStorage pour les données formulaires

### Temps Typiques

```
Chargement APIs:        200-500ms
Affichage DOM:          100-200ms
Total page:             ~1-2 secondes
Après cache:            <500ms
```

---

## 🚀 DÉPLOIEMENT

### Avant Déploiement

1. ✅ Testez avec [test-api.html](test-api.html)
2. ✅ Vérifiez les logs dans la console (F12)
3. ✅ Testez sur mobile/tablet/desktop
4. ✅ Assurez-vous HTTPS est activé

### Sur le Serveur

1. Uploadez tous les fichiers
2. Vérifiez que https://capbio.bi/mutama/api/* est accessible
3. Testez avec test-api.html
4. Si CORS problème → Contacter backend

---

## 🐛 DÉPANNAGE

### Les images ne s'affichent pas

**Problème:** Les URLs des images sont incorrectes

**Solution:**
1. Ouvrir test-api.html
2. Vérifier les URLs dans "Afficher les données"
3. Les URLs doivent être complètes (http/https)
4. Si relatives → Vérifier le chemin de base

### API ne répond pas

**Problème:** Erreur CORS ou API offline

**Solution:**
1. Vérifier la console (F12 > Console)
2. Vérifier l'URL dans api.js
3. Tester directement: https://capbio.bi/mutama/api/appartment
4. Contacter le supporteur backend

### Aucune donnée affichée

**Problème:** Les APIs retournent un format inattendu

**Solution:**
1. Ouvrir test-api.html
2. Vérifier le format JSON retourné
3. Mettre à jour api.js si format différent
4. Utiliser les champs reconnus (voir section "Structure des APIs")

---

## 📞 SUPPORT TECHNIQUE

Si vous avez des questions sur l'intégration des APIs :

1. Consultez ce guide
2. Vérifiez test-api.html
3. Vérifiez la console (F12)
4. Vérifiez les logs (console.log)
5. Contactez le support backend pour les APIs

---

## 📚 RESSOURCES

- [Documentation API REST](https://restfulapi.net/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Console JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/console)
- [Debugging](https://developer.mozilla.org/en-US/docs/Tools/Debugger)

---

**Créé le:** 23 Janvier 2024  
**Dernière mise à jour:** 23 Janvier 2024  
**Version:** 1.0.0 ✅