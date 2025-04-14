const photos = [
  'photo1.jpg',
  'photo2.jpg',
  'photo3.jpg'
];

const gallery = document.getElementById('gallery');
const isEditMode = window.location.search.includes('edit');

// Load saved order from localStorage
let savedOrder = localStorage.getItem('photoOrder');
let photoOrder = savedOrder ? JSON.parse(savedOrder) : photos;

// Populate gallery
function renderGallery() {
  gallery.innerHTML = '';
  photoOrder.forEach(photo => {
    const img = document.createElement('img');
    img.src = 'photos/' + photo;
    img.alt = photo;
    img.addEventListener('click', () => showModal(img.src));
    gallery.appendChild(img);
  });
}

renderGallery();

// Enable drag-and-drop if in edit mode
if (isEditMode) {
  new Sortable(gallery, {
    animation: 150,
    onEnd: () => {
      const newOrder = Array.from(gallery.querySelectorAll('img')).map(img =>
        img.src.split('/').pop()
      );
      localStorage.setItem('photoOrder', JSON.stringify(newOrder));
    }
  });
}

// Modal logic
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

function showModal(src) {
  modal.style.display = 'block';
  modalImg.src = src;
}

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
