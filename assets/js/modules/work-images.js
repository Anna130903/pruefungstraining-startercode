export async function workImages() {
  const imageContainer = document.querySelector("[data-js-work-images]");
  if (!imageContainer) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  try {
    const response = await fetch("/works/n-pola/04-results/images/metadata.json");
    const images = await response.json();
    let currentIndex = 0;

    // Bilder im Grid erstellen
    images.forEach((img, index) => {
      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.metadata?.Title || "Bild";
      imageContainer.appendChild(image);

      image.addEventListener("click", () => {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightbox.style.display = "flex";
      });
    });

    // Lightbox schließen
    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    });

    // Klick außerhalb des Bildes schließt Lightbox
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxImg.src = "";
      }
    });

    // Vorwärts / Rückwärts Navigation
    lightboxPrev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
    });

    lightboxNext.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
    });

    // Optional: Pfeiltasten auf Tastatur
    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft") {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          lightboxImg.src = images[currentIndex].src;
        } else if (e.key === "ArrowRight") {
          currentIndex = (currentIndex + 1) % images.length;
          lightboxImg.src = images[currentIndex].src;
        } else if (e.key === "Escape") {
          lightbox.style.display = "none";
          lightboxImg.src = "";
        }
      }
    });

  } catch (error) {
    console.error("Fehler beim Laden der metadata.json:", error);
    imageContainer.innerHTML = "<p>Fehler beim Laden der Bilder.</p>";
  }
}
