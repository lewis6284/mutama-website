import { API } from './api.js';
import { CONFIG } from './config.js';

/**
 * Main - Gère l'affichage dynamique des données
 */

let allData = {
    apartments: [],
    rooms: [],
    posts: [],
    files: [],
    allImages: []
};

/**
 * Initialise l'application
 */
async function initApp() {
    // Charger toutes les données
    allData = await API.loadAllData();

    console.log('📊 Données chargées complètement');
    console.log(allData);

    // Récupérer toutes les images
    allData.allImages = API.getAllImages(
        allData.apartments,
        allData.rooms,
        allData.posts,
        allData.files
    );

    // Afficher les maisons et chambres
    displayApartmentsWithRooms();

    // Afficher la galerie (4 premières images)
    displayGallery();

    // Afficher les témoignages
    displayTestimonials();

    // Remplir les sélecteurs de réservation
    populateReservationSelects();
}

/**
 * Affiche les appartements avec leurs chambres
 */
function displayApartmentsWithRooms() {
    const container = document.getElementById('maisons-container');

    if (!allData.apartments || allData.apartments.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600">Aucun appartement disponible</p>';
        return;
    }

    container.innerHTML = allData.apartments.map((apartment, index) => {
        // Récupérer les chambres de cet appartement
        const apartmentRooms = allData.rooms.filter(room => {
            const roomAptId = room.appartmentId || room.appartment_id || room.apartmentId;
            return roomAptId == apartment.id;
        });

        // Récupérer l'image de l'appartement
        const apartmentImage = API.getImageUrl(apartment, allData.files);

        return `
            <div class="bg-white rounded-lg overflow-hidden shadow-lg card-hover hover:shadow-2xl">
                <div class="h-48 bg-gray-300 overflow-hidden">
                    <img src="${apartmentImage}" alt="${apartment.name || 'Appartement'}" class="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110" onerror="this.src='${API.getDefaultImage()}'">
                </div>
                
                <div class="p-6">
                    <h2 class="font-playfair text-2xl font-bold text-gray-900 mb-2">${apartment.name || `Appartement ${index + 1}`}</h2>
                    
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                        ${apartment.description || apartment.details || 'Un excellent choix pour votre séjour confortable.'}
                    </p>
                    
                    <div>
                        <h3 class="font-semibold text-base text-gray-900 mb-3">Chambres (${apartmentRooms.length})</h3>
                        
                        ${apartmentRooms.length > 0
                ? `<div class="grid grid-cols-1 gap-3">
                                ${apartmentRooms.map(room => createRoomCard(room)).join('')}
                              </div>`
                : '<p class="text-gray-600 text-sm">Aucune chambre disponible</p>'
            }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Crée une carte pour une chambre
 */
function createRoomCard(room) {
    const roomImage = API.getImageUrl(room, allData.files);
    const price = room.price || room.prix || room.prixParNuit || room.price_per_night || 'Nous consulter';
    const amenities = room.amenities || room.equipements || room.features || '';

    return `
        <div class="border border-gray-200 rounded-lg overflow-hidden card-hover bg-white">
            <div class="h-40 bg-gray-300 overflow-hidden">
                <img src="${roomImage}" alt="${room.name || 'Chambre'}" class="w-full h-full object-cover" onerror="this.src='${API.getDefaultImage()}'">
            </div>
            
            <div class="p-4">
                <h4 class="font-bold text-gray-900 mb-2">${room.name || room.title || 'Chambre'}</h4>
                
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                    ${room.description || room.details || 'Chambre confortable et bien aménagée'}
                </p>
                
                <div class="flex justify-between items-center mb-3">
                    <span class="text-lg font-bold text-amber-600">
                        ${typeof price === 'number' ? price.toLocaleString() : price}
                        ${typeof price === 'number' ? ' FBu' : ''}
                    </span>
                </div>
                
                ${amenities ? `
                    <div class="flex flex-wrap gap-2 mb-3">
                        ${amenities.toString().split(',').slice(0, 3).map(amenity =>
        `<span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">${amenity.trim()}</span>`
    ).join('')}
                    </div>
                ` : ''}
                
                <a href="reservation.html" class="block text-center text-amber-600 hover:text-amber-700 font-semibold text-sm transition">
                    <i class="fas fa-arrow-right mr-1"></i>Réserver
                </a>
            </div>
        </div>
    `;
}

/**
 * Affiche la galerie (4 premières images)
 */
function displayGallery() {
    const container = document.getElementById('galerie-container');

    // Utiliser les images récupérées et triées
    let images = allData.allImages && allData.allImages.length > 0
        ? allData.allImages.slice(0, 4)
        : [];

    // Fallback si pas d'images
    if (images.length === 0) {
        images = [
            {
                url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
                title: 'Chambres modernes'
            },
            {
                url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
                title: 'Confort et relaxation'
            },
            {
                url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
                title: 'Ambiance chaleureuse'
            },
            {
                url: 'https://images.unsplash.com/photo-1519451241446-33a6461ceace?w=600&h=400&fit=crop',
                title: 'Espaces élégants'
            }
        ];
    }

    container.innerHTML = images.map((image, index) => `
        <div class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg h-64" data-index="${index}">
            <img src="${image.url}" alt="${image.title || 'Image'}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='${API.getDefaultImage()}'">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-end p-4">
                <p class="text-white font-semibold opacity-0 group-hover:opacity-100 transition duration-300">${image.title || 'Image'}</p>
            </div>
        </div>
    `).join('');
}

/**
 * Affiche les témoignages
 */
function displayTestimonials() {
    const container = document.getElementById('temoignages-container');

    if (!allData.posts || allData.posts.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600 col-span-full">Aucun témoignage disponible</p>';
        return;
    }

    container.innerHTML = allData.posts.slice(0, 3).map(post => {
        const rating = post.rating || post.note || post.stars || 5;
        const stars = '⭐'.repeat(Math.min(Math.max(1, rating), 5));

        return `
            <div class="bg-white p-6 rounded-lg shadow-lg card-hover">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900">${post.author || post.name || post.client || 'Client'}</h4>
                        <p class="text-sm text-gray-600">${post.date || post.created_at || new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>
                
                <div class="testimonial-stars text-2xl mb-3">
                    ${stars}
                </div>
                
                <p class="text-gray-700 leading-relaxed">
                    "${post.content || post.message || post.description || post.text || 'Excellente expérience!'}"
                </p>
            </div>
        `;
    }).join('');
}

/**
 * Remplit les sélecteurs de réservation
 */
function populateReservationSelects() {
    const apartmentSelect = document.getElementById('select-appartement');
    const roomSelect = document.getElementById('select-chambre');

    if (apartmentSelect && allData.apartments && allData.apartments.length > 0) {
        apartmentSelect.innerHTML = '<option value="">-- Sélectionner un appartement --</option>' +
            allData.apartments.map(apt =>
                `<option value="${apt.id}">${apt.name || 'Appartement'}</option>`
            ).join('');

        // Changer les chambres quand l'appartement change
        apartmentSelect.addEventListener('change', function () {
            const selectedAptId = this.value;
            const roomsForApt = allData.rooms.filter(room => {
                const roomAptId = room.appartmentId || room.appartment_id || room.apartmentId;
                return roomAptId == selectedAptId;
            });

            roomSelect.innerHTML = '<option value="">-- Sélectionner une chambre --</option>' +
                roomsForApt.map(room =>
                    `<option value="${room.id}" data-price="${room.price || room.prix || 0}" data-desc="${room.description || ''}">${room.name || 'Chambre'}</option>`
                ).join('');
        });
    }
}

/**
 * Gestion du formulaire de réservation rapide
 */
document.addEventListener('DOMContentLoaded', function () {
    const quickReservationForm = document.getElementById('quick-reservation');

    if (quickReservationForm) {
        quickReservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                appartement: document.getElementById('select-appartement').value,
                chambre: document.getElementById('select-chambre').value,
                dateArrivee: document.getElementById('date-arrivee').value,
                dateDepart: document.getElementById('date-depart').value,
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value
            };

            // Valider les données
            if (!formData.appartement || !formData.chambre || !formData.dateArrivee ||
                !formData.dateDepart || !formData.nom || !formData.email || !formData.telephone) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            if (new Date(formData.dateDepart) <= new Date(formData.dateArrivee)) {
                alert('La date de départ doit être après la date d\'arrivée');
                return;
            }

            // Sauvegarder dans localStorage et rediriger vers la page de réservation
            localStorage.setItem('reservationData', JSON.stringify(formData));
            window.location.href = 'reservation.html';
        });
    }

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Merci pour votre message! Nous vous recontacterons bientôt.');
            this.reset();
        });
    }

    // Initialiser l'app
    initApp();
});

// Smooth scroll pour les liens
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
