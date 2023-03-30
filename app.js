const images = document.querySelectorAll('.zoomable');

images.forEach(image => {
  image.addEventListener('click', () => {
    image.classList.toggle('zoomed');
  });
});