# 🚀 INSTRUCTIONS RAPIDES - UTILISATION DES APIs

## 📋 EN 3 ÉTAPES

### Étape 1: TESTER LES APIs
```
1. Ouvrir: test-api.html dans le navigateur
2. Attendre le chargement
3. Vérifier que tous les endpoints sont ✅ (vert)
```

### Étape 2: VÉRIFIER LA CONSOLE
```
1. Appuyer sur F12
2. Aller à l'onglet "Console"
3. Chercher les logs avec ✅ (pas d'erreurs ❌)
```

### Étape 3: VÉRIFIER LE SITE
```
1. Ouvrir index.html
2. Vérifier que les apartements s'affichent
3. Vérifier que les images s'affichent
4. Tester galerie.html
```

---

## 🔌 APIS DISPONIBLES

```
🔗 https://severinhouse.bi/api/appartment    → Appartements
🔗 https://severinhouse.bi/api/room          → Chambres
🔗 https://severinhouse.bi/api/post          → Posts (Témoignages)
🔗 https://severinhouse.bi/api/file          → Fichiers (Images)
```

---

## 💻 CODE UTILISÉ

Le code dans **assets/js/api.js** :

```javascript
// Récupérer les appartements
const apartments = await API.getApartments();

// Récupérer les chambres
const rooms = await API.getRooms();

// Récupérer les posts (témoignages)
const posts = await API.getPosts();

// Récupérer les fichiers
const files = await API.getFiles();

// OU charger tout en une fois
const allData = await API.loadAllData();
// allData.apartments
// allData.rooms
// allData.posts
// allData.files

// Récupérer TOUTES les images
const allImages = API.getAllImages(apartments, rooms, posts, files);

// Récupérer l'image d'une entité
const imageUrl = API.getImageUrl(apartment);

// Image par défaut
const defaultImage = API.getDefaultImage();
```

---

## 📊 STRUCTURE DES DONNÉES

### Appartement
```javascript
{
  id: 1,
  name: "Appartement Luxe",
  description: "Description...",
  image: "url-image",
  price: 50000
}
```

### Chambre
```javascript
{
  id: 1,
  name: "Chambre Déluxe",
  description: "Description...",
  image: "url-image",
  price: 50000,
  appartmentId: 1  // Lien vers appartement
}
```

### Post (Témoignage)
```javascript
{
  id: 1,
  title: "Excellent!",
  content: "C'était magnifique...",
  author: "Jean Dupont",
  rating: 5,
  image: "url-image",
  heroImage: "url-hero-image"
}
```

### Fichier
```javascript
{
  id: 1,
  name: "image.jpg",
  url: "path/to/file",
  type: "image/jpeg"
}
```

---

## 🖼️ AFFICHAGE DES IMAGES

### Images Affichées Actuellement

✅ **index.html (Accueil)**
- Appartements : Image principale
- Chambres : Image de chaque chambre
- Galerie : 4 premières images
- Témoignages : Pas d'images (optionnel)

✅ **galerie.html (Galerie Complète)**
- TOUTES les images trouvées
- Posts, Chambres, Appartements, Fichiers
- Filtres par catégorie
- Lightbox avec agrandissement

✅ **reservation.html (Réservation)**
- Pas d'images (formulaire)

✅ **contact.html (Contact)**
- Pas d'images (formulaire + FAQ)

---

## 🐛 DÉPANNAGE RAPIDE

### Problème: "Les images ne s'affichent pas"

**Étape 1:** Ouvrir test-api.html
- Si ❌ Erreur → L'API ne répond pas
- Si ✅ OK → Les images doivent s'afficher

**Étape 2:** Vérifier la Console (F12)
- Chercher les logs ❌ en rouge
- Noter le message d'erreur

**Étape 3:** Vérifier les URLs des images
- test-api.html → Afficher les données
- Chercher le champ "image" ou "heroImage"
- Vérifier que c'est une URL (http/https)

**Étape 4:** Tester l'URL directement
- Copier l'URL de l'image
- Ouvrir dans un nouvel onglet
- Si ❌ Erreur 404 → L'image n'existe pas sur le serveur

### Problème: "test-api.html affiche ❌"

**Cause probable:** L'API ne répond pas

**Solutions:**
1. Vérifier le WiFi/Internet
2. Vérifier l'URL: https://capbio.bi/mutama/api/appartment
3. Attendre quelques secondes
4. Essayer avec un autre navigateur
5. Effacer le cache (Ctrl+Maj+Suppr)

### Problème: "Aucune donnée dans la console"

**Étapes:**
1. Ouvrir F12 → Console
2. Copier-coller:
```javascript
API.loadAllData().then(data => {
  console.log('Données:', data);
  console.log('Appartements:', data.apartments.length);
  console.log('Chambres:', data.rooms.length);
  console.log('Images:', data.allImages.length);
});
```
3. Appuyer Entrée
4. Attendre la réponse

---

## 📈 LOGS UTILES

Ouvrir la Console (F12) et chercher :

```
✅ Récupération réussie
   📥 Récupération des appartements...
   ✅ Appartements chargés: 5

❌ Erreur API
   ❌ Erreur lors de la récupération des chambres: 
   Network error / 404 / 500
```

---

## 🔗 FICHIERS IMPORTANTS

| Fichier | Rôle |
|---------|------|
| **assets/js/api.js** | Module API (core) |
| **assets/js/main.js** | Affichage dynamique |
| **test-api.html** | 🧪 Outil de test |
| **API_GUIDE.md** | 📚 Guide complet |
| **CHANGELOG.md** | 📝 Améliorations |
| **index.html** | 🏠 Accueil |
| **galerie.html** | 🖼️ Galerie |
| **reservation.html** | 📅 Réservation |
| **contact.html** | 📧 Contact |

---

## ✨ FONCTIONNALITÉS

✅ **4 APIs intégrées**
- Appartements
- Chambres
- Posts/Témoignages
- Fichiers/Images

✅ **Affichage intelligent**
- Images depuis les APIs
- Fallback automatique
- Responsive design
- Lazy loading

✅ **Flexible**
- Accepte multiple formats de données
- Gère les variantes de champs
- Erreurs bien gérées

✅ **Documenté**
- test-api.html pour vérifier
- API_GUIDE.md pour détails
- Logs dans la console
- CHANGELOG.md pour l'historique

---

## 🎯 MISE EN LIGNE

### Avant de mettre en ligne

Checklist complète:
- [ ] test-api.html → Tous les endpoints ✅
- [ ] Console (F12) → Pas d'erreurs ❌
- [ ] index.html → Données affichées
- [ ] galerie.html → Images affichées + filtres
- [ ] Tester sur mobile
- [ ] Tester les formulaires
- [ ] Vérifier les fallback images

### Mise en ligne

```bash
# 1. Vérifier une dernière fois
Open test-api.html

# 2. Uploader les fichiers
- index.html
- reservation.html
- galerie.html
- contact.html
- assets/js/*.js
- Tout les autres fichiers

# 3. Tester en ligne
Open https://votredomaine.com
Open https://votredomaine.com/test-api.html
```

---

## 📞 AIDE RAPIDE

**Q: Comment ajouter plus d'images?**
A: Les images viennent des APIs. Ajouter plus d'images dans le backend.

**Q: Comment changer la couleur?**
A: Modifier les classes Tailwind dans les fichiers HTML.

**Q: Comment ajouter une nouvelle page?**
A: Copier index.html et adapter le contenu.

**Q: Comment déboguer?**
A: Ouvrir F12, aller à Console, chercher les logs.

**Q: Les images ne chargent pas**
A: Vérifier test-api.html, puis API_GUIDE.md section dépannage.

---

## 🚀 LANCEMENT RAPIDE

```bash
# 1. Tester les APIs
Ouvrir test-api.html

# 2. Si OK → Vérifier l'accueil
Ouvrir index.html

# 3. Si OK → Mettre en ligne
Uploader les fichiers
```

---

## 📚 RESSOURCES

- **API_GUIDE.md** → Guide API complet
- **test-api.html** → Outil de test
- **CHANGELOG.md** → Historique améliorations
- **DOCUMENTATION.md** → Documentation générale
- **README.md** → Guide technique

---

**Version:** 2.0 (APIs Optimisées)  
**Date:** 23 Janvier 2024  
**Status:** ✅ Prêt pour Production