// ==========================================================================
// CARRUSEL 1: RESEÑAS (MATEO, VALERIA, ETC.)
// ==========================================================================
const trackReviews = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function getCardsInView() {
    return window.innerWidth > 992 ? 2 : 1;
}

function updateCarousel() {
    if (!trackReviews) return;
    const cardWidth = trackReviews.querySelector('.eames-card').getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(trackReviews).gap) || 0;
    const totalSlides = 6;
    const visibleCards = getCardsInView();
    
    if (currentIndex > totalSlides - visibleCards) {
        currentIndex = totalSlides - visibleCards;
    }
    if (currentIndex < 0) currentIndex = 0;

    const moveAmount = currentIndex * (cardWidth + gap);
    trackReviews.style.transform = `translateX(-${moveAmount}px)`;
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const totalSlides = 6;
        if (currentIndex < totalSlides - getCardsInView()) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateCarousel();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = 6 - getCardsInView(); 
        }
        updateCarousel();
    });
}

window.addEventListener('resize', updateCarousel);

// Sistema del Modal / Lightbox
function openModal(cardElement) {
    if(document.getElementById('cardModal').classList.contains('active')) return;
    
    const modal = document.getElementById('cardModal');
    const contentContainer = document.getElementById('modalBodyContent');
    
    const clonedCard = cardElement.cloneNode(true);
    clonedCard.removeAttribute('onclick');
    
    contentContainer.innerHTML = '';
    contentContainer.appendChild(clonedCard);
    modal.classList.add('active');
}

function closeModal(event) {
    if (event.target.id === 'cardModal') {
        document.getElementById('cardModal').classList.remove('active');
    }
}

// Acordeón FAQ
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.faq-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            currentItem.classList.toggle('active');
        });
    });
});

//SECCION IMAGEN VIDEO
// Seleccionamos el contenedor y el video
const visionWrapper = document.querySelector('.vision-image-wrapper');
const visionVideo = visionWrapper.querySelector('video');

// Cuando el mouse ENTRA al contenedor
visionWrapper.addEventListener('mouseenter', () => {
    visionVideo.play(); // Le da play al video
    visionWrapper.classList.add('active'); // Activa los estilos CSS (opacity)
});

// Cuando el mouse SALE del contenedor
visionWrapper.addEventListener('mouseleave', () => {
    visionVideo.pause(); // Pausa el video en el segundo exacto donde quedó
    visionWrapper.classList.remove('active'); // Quita los estilos CSS (vuelve a la imagen)
});


// ==========================================================================
// CARRUSEL 2: GALERÍA CÁPSULA (PIEZAS INTERVENIDAS)
// ==========================================================================
const itemsCapsula = [
  { src: 'imagenes/capsula1.png', label: 'Sillón Aragem ' },
  { src: 'imagenes/capsula2.png', label: 'Silla Veta' },
  { src: 'imagenes/capsula3.png', label: 'Sillón Loma' },
  { src: 'imagenes/capsula4.png', label: 'Mesa Nexo' },
  { src: 'imagenes/capsula5.png', label: 'Cómoda Nogal' },
];

let currentCapsula = 0;
const trackCapsula = document.getElementById('track');
const counterCapsula = document.getElementById('counter');

function getVisibleCapsula(center) {
  const n = itemsCapsula.length;
  return [
    (center - 2 + n) % n,
    (center - 1 + n) % n,
    center,
    (center + 1) % n,
    (center + 2) % n,
  ];
}

function renderCapsula() {
  if (!trackCapsula) return;
  const vis = getVisibleCapsula(currentCapsula);
  trackCapsula.innerHTML = '';

  vis.forEach((idx, pos) => {
    const card2 = document.createElement('div');
    let cls = 'card2 ';
    if (pos === 2) cls += 'active';
    else if (pos === 1 || pos === 3) cls += 'side';
    else cls += 'far-side';
    card2.className = cls;

    const img = document.createElement('img');
    img.src = itemsCapsula[idx].src;
    img.alt = itemsCapsula[idx].label;
    card2.appendChild(img);

    if (pos === 2) {
      const overlay = document.createElement('div');
      overlay.className = 'card2-overlay';
      overlay.innerHTML = `
        <span class="overlay-text">${itemsCapsula[idx].label}</span>
        <button class="overlay-btn" aria-label="Ver pieza">+</button>
      `;
      card2.appendChild(overlay);
    }

    if (pos !== 2) {
      card2.addEventListener('click', () => {
        const diff = pos - 2;
        currentCapsula = (currentCapsula + diff + itemsCapsula.length) % itemsCapsula.length;
        renderCapsula();
      });
    }

    trackCapsula.appendChild(card2);
  });

  if (counterCapsula) {
    const num = String(currentCapsula + 1).padStart(2, '0');
    counterCapsula.textContent = num;
  }
}

if (document.getElementById('prev')) {
    document.getElementById('prev').addEventListener('click', () => {
      currentCapsula = (currentCapsula - 1 + itemsCapsula.length) % itemsCapsula.length;
      renderCapsula();
    });
}

if (document.getElementById('next')) {
    document.getElementById('next').addEventListener('click', () => {
      currentCapsula = (currentCapsula + 1) % itemsCapsula.length;
      renderCapsula();
    });
}

// Inicializar carruseles al cargar la página
window.addEventListener('load', () => {
    updateCarousel();
    renderCapsula();
});

// FORMULARIO CONTACTO
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('custom-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Captura de datos del formulario
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Aquí puedes realizar tu llamada fetch/AJAX para enviar los datos
      console.log('Datos listos para enviar:', data);

      // Ejemplo de feedback visual básico
      const submitButton = this.querySelector('.btn-submit');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your message has been sent successfully.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        contactForm.reset();
      }, 1500); 
    });
  }
});