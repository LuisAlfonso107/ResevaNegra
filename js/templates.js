// js/templates.js

// 1. Plantilla más básica y útil para probar (tarjeta simple - empieza por esta)
export const cardTemplate = ({ title, description, icon = 'coffee' }) => `
  <div class="card">
    <i class="fas fa-${icon}"></i>
    <h3>${title}</h3>
    <p>${description}</p>
  </div>
`;

// 2. Plantilla para sección "Nuestra Esencia" / Calidad (muy importante para tu tema de café premium)
export const essenceCardTemplate = ({ icon, title, description }) => `
  <div class="card essence-card fade-in">
    <div class="icon-wrapper">
      <i class="fas fa-${icon}"></i>
    </div>
    <h3>${title}</h3>
    <p>${description}</p>
  </div>
`;

// 3. Plantilla para tarjetas de productos (la que más vas a usar en la tienda)
export const productCardTemplate = ({ name, price, img, description = '' }) => `
  <div class="card product-card fade-in">
    <div class="product-image">
      <img src="${img}" alt="${name}" loading="lazy">
    </div>
    <h3>${name}</h3>
    <p class="price">${price}</p>
    ${description ? `<p class="description">${description}</p>` : ''}
    <a href="https://wa.me/TU_NUMERO_AQUI?text=Interesado%20en%20${encodeURIComponent(name)}" 
       class="btn btn-buy" target="_blank">
      Comprar
    </a>
  </div>
`;

// 4. Plantilla para item de galería (fotos de plantaciones/origen)
export const galleryItemTemplate = ({ src, alt }) => `
  <div class="gallery-item fade-in">
    <img src="${src}" alt="${alt}" loading="lazy">
  </div>
`;