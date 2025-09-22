class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <header class="header">
        <div class="home-button">
          <a href="/"><i class="icofont-book-alt is-large"></i></a>
        </div>
        <h1 class="title">Praxisprojekte & Abschlussarbeiten</h1>
        <h2 class="subtitle">bei <a href="https://christiannoss.de">Christian Noss</a></h2>
      </header>
    `;
  }
}

customElements.define("my-header", MyHeader);
