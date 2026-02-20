import { CONFIG } from './config.js';

export const API = {
  async fetchJSON(endpoint) {
    try {
      const response = await fetch(CONFIG.API_BASE + endpoint);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  getApartments() {
    return this.fetchJSON('appartment');
  },

  getRooms() {
    return this.fetchJSON('room');
  },

  getPosts() {
    return this.fetchJSON('post');
  },

  getFiles() {
    return this.fetchJSON('file');
  },

  async loadAllData() {
    const [apartments, rooms, posts, files] = await Promise.all([
      this.getApartments(),
      this.getRooms(),
      this.getPosts(),
      this.getFiles()
    ]);
    return { apartments, rooms, posts, files };
  },

  getAllImages(apartments, rooms, posts, files) {
    let allImages = [];
    if (apartments) apartments.forEach(apt => {
      if (apt.images) apt.images.forEach(img => allImages.push({ url: img.url || img, title: apt.name }));
    });
    if (rooms) rooms.forEach(room => {
      if (room.images) room.images.forEach(img => allImages.push({ url: img.url || img, title: room.name }));
    });
    if (posts) posts.forEach(post => {
      if (post.heroImage) allImages.push({ url: post.heroImage.url || post.heroImage, title: post.title });
    });
    if (files) files.forEach(file => {
      if (file.url) allImages.push({ url: file.url, title: 'Galerie' });
    });
    return allImages;
  },

  getImageUrl(item, files) {
    if (item.images && item.images.length > 0) return item.images[0].url || item.images[0];
    if (item.heroImage) return item.heroImage.url || item.heroImage;
    return this.getDefaultImage();
  },

  getDefaultImage() {
    return 'assets/images/placeholder.jpg';
  }
};
