export async function workImages() {
  const imageContainer = document.querySelector("[data-js-work-images]");
  if (!imageContainer) return; // Sicherheitscheck

  try {
    // JSON laden
    const response = await fetch("/works/n-pola/04-results/images/metadata.json");
    const images = await response.json();
    
    images.forEach(img => {
      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.metadata?.Title || "Bild";
      imageContainer.appendChild(image);
    });
    

  } catch (error) {
    console.error("Fehler beim Laden der metadata.json:", error);
    imageContainer.innerHTML = "<p>Fehler beim Laden der Bilder.</p>";
  }
}
