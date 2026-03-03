// js/main.js

// Importamos las plantillas
import { 
  essenceCardTemplate, 
  productCardTemplate, 
  galleryItemTemplate 
} from './templates.js';

// Datos (los llenas cuando quieras)
const essenceData = [];
const productsData = [];
const galleryData = [];

// Función reutilizable para renderizar secciones
function renderSection(containerId, data, templateFn) {
  const container = document.getElementById(containerId);
  if (!container || !data.length) return;
  container.innerHTML = data.map(item => templateFn(item)).join('');
}

// Inicialización principal (todo se ejecuta una sola vez al cargar la página)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Renderizamos las secciones dinámicas
  renderSection('essence-cards', essenceData, essenceCardTemplate);
  renderSection('products-grid', productsData, productCardTemplate);
  renderSection('origin-gallery', galleryData, galleryItemTemplate);

  // 2. Menú hamburguesa
  setupHamburgerMenu();

  // 3. Animaciones fade-in al hacer scroll
  setupFadeInObserver();

  // 4. Carrusel en el hero (¡AHORA SÍ FUNCIONA!)
  initCarousel();

  console.log('Reserva Negra - Sitio inicializado correctamente');
});

// Menú hamburguesa
function setupHamburgerMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }
}

// Fade-in suave al entrar en vista
function setupFadeInObserver() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// CARRUSEL DEL HERO - FUNCIONAL Y ELEGANTE
function initCarousel() {
  const carouselImages = [
    'images/plantation-1.jpg',
    'images/plantation-2.jpg',
    'images/coffee-beans-closeup-1.jpg',
    'images/coffee-beans-closeup-2.jpg',
    'images/packaging-black-gold.jpg',
    'images/hero-background.jpg'
  ];

  const track = document.getElementById('carouselTrack');
  if (!track) return;

  // Generar slides
  track.innerHTML = carouselImages.map(src => `
    <div class="carousel-slide">
      <img src="${src}" alt="Reserva Negra - Café de Altura" loading="lazy">
    </div>
  `).join('');

  let currentIndex = 0;
  const totalSlides = carouselImages.length;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Autoplay cada 5 segundos
  let interval = setInterval(nextSlide, 5000);

  // Pausa al hover (experiencia premium)
  track.addEventListener('mouseenter', () => clearInterval(interval));
  track.addEventListener('mouseleave', () => {
    interval = setInterval(nextSlide, 5000);
  });

  // Opcional: clic en indicadores (si los agregas después)
  // track.addEventListener('click', () => nextSlide());
}