export async function workImages() {
  const imageContainer = document.querySelector("[data-js-work-images]");
  if (!imageContainer) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  try {
    const response = await fetch("/works/n-pola/04-results/images/metadata.json");
    const images = await response.json();

    images.forEach(img => {
      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.metadata?.Title || "Bild";
      imageContainer.appendChild(image);

      // klick-handler bleibt wie zuvor
      image.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex"; // flex sorgt für Zentrierung
      });
    });

    // Lightbox schließen
    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    });

    // Klick außerhalb des Bildes schließt ebenfalls die Lightbox
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxImg.src = "";
      }
    });

  } catch (error) {
    console.error("Fehler beim Laden der metadata.json:", error);
    imageContainer.innerHTML = "<p>Fehler beim Laden der Bilder.</p>";
  }
}
