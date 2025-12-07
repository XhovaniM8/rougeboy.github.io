document.addEventListener("DOMContentLoaded", () => {
  // Create the modal elements
  createPhotoModal();

  // Set up all image containers for interaction
  const photoContainers = document.querySelectorAll(
    ".photo__container--wrapper"
  );

  // Store all images for navigation
  const allImages = document.querySelectorAll(".photo__container--item");

  // Add click event to each photo container
  photoContainers.forEach((container, index) => {
    container.addEventListener("click", () => {
      const image = container.querySelector(".photo__container--item");
      openPhotoModal(image, index, allImages);
    });
  });
});

// Create the modal structure in the DOM
function createPhotoModal() {
  // Check if modal already exists
  if (document.querySelector(".photo-modal")) return;

  // Create modal container
  const modal = document.createElement("div");
  modal.className = "photo-modal";

  // Create close button
  const closeBtn = document.createElement("span");
  closeBtn.className = "photo-modal__close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", closePhotoModal);

  // Create content container
  const modalContent = document.createElement("div");
  modalContent.className = "photo-modal__content";

  // Create image element
  const modalImg = document.createElement("img");
  modalImg.className = "photo-modal__image";
  modalContent.appendChild(modalImg);

  // Create navigation buttons
  const navigation = document.createElement("div");
  navigation.className = "photo-modal__navigation";

  const prevBtn = document.createElement("button");
  prevBtn.className = "photo-modal__nav-btn prev";
  prevBtn.innerHTML = "&#10094;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "photo-modal__nav-btn next";
  nextBtn.innerHTML = "&#10095;";

  navigation.appendChild(prevBtn);
  navigation.appendChild(nextBtn);

  // Assemble modal
  modal.appendChild(closeBtn);
  modal.appendChild(modalContent);
  modal.appendChild(navigation);

  // Add modal to page
  document.body.appendChild(modal);

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePhotoModal();
    }
  });

  // Handle keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closePhotoModal();
    } else if (e.key === "ArrowRight") {
      nextBtn.click();
    } else if (e.key === "ArrowLeft") {
      prevBtn.click();
    }
  });
}

// Open the modal with the selected image
function openPhotoModal(image, currentIndex, allImages) {
  const modal = document.querySelector(".photo-modal");
  const modalImg = modal.querySelector(".photo-modal__image");
  const prevBtn = modal.querySelector(".photo-modal__nav-btn.prev");
  const nextBtn = modal.querySelector(".photo-modal__nav-btn.next");

  // Set image source
  modalImg.src = image.src;
  modalImg.alt = image.alt;

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling

  // Set up navigation
  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    modalImg.src = allImages[currentIndex].src;
    modalImg.alt = allImages[currentIndex].alt;
  };

  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % allImages.length;
    modalImg.src = allImages[currentIndex].src;
    modalImg.alt = allImages[currentIndex].alt;
  };
}

// Close the modal
function closePhotoModal() {
  const modal = document.querySelector(".photo-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Re-enable scrolling
}
