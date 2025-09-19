export async function finishedWorks() {
  const worksContainer = document.querySelector("[data-js-finished-works]");
  if (!worksContainer) return; // Sicherheitscheck, falls Section fehlt

  try {
    // JSON laden
    const response = await fetch("http://localhost:3000/works.json");
    const works = await response.json();

    // neueste Arbeiten sortieren
    works.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Anzahl für erste Anzeige
    const initialCount = 5;

    // Render-Funktion für eine Arbeit
   const renderWork = work => {
  const li = document.createElement("li");
  li.classList.add("work-item");

  // Nur Bild-HTML erzeugen, wenn es eins gibt
  const imageHTML = work.image && work.image.trim() !== ""
    ? `<div class="work-image"><img src="${work.image}" alt="${work.title}"></div>`
    : "";

  li.innerHTML = `
    <article class="work-card">
      ${imageHTML}
      <div class="work-content">
        <h3 class="work-title">
          <a href="${work.url}">${work.title}</a>
        </h3>
        <p class="work-meta">
          ${work.author}, ${work.type}, 
          ${new Date(work.date).toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
        </p>
      </div>
    </article>
  `;

  worksContainer.appendChild(li);
};


    // Zuerst 5 rendern
    works.slice(0, initialCount).forEach(renderWork);

    // Button erstellen
    if (works.length > initialCount) {
      const button = document.createElement("button");
      button.textContent = "Weitere Arbeiten anzeigen";
      button.classList.add("show-more-button");

      // Button einfügen (nach der Liste)
      worksContainer.insertAdjacentElement("afterend", button);

      // Klick-Event
      button.addEventListener("click", () => {
        works.slice(initialCount).forEach(renderWork);
        button.remove(); // Button verschwindet nach dem Laden
      });
    }

  } catch (error) {
    console.error("Fehler beim Laden der works.json:", error);
    worksContainer.innerHTML = "<li>Fehler beim Laden der Arbeiten.</li>";
  }
}
