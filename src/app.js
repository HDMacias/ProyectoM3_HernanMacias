function getHomeView() {
  return `<div class="view">
      <h1 class="home__title">Hola. Soy Tony Stark.</h1>
      <p class="home__subtitle">
        Genio, multimillonario, filántropo... y ahora disponible para chatear.
        Si tenés alguna pregunta inteligente, adelante. Si no, también.
      </p>
      <a href="/chat" class="home__cta">Iniciar conversación →</a>
    </div>
  `;
}

function getAboutView() {
  return `
    <div class="view">
      <h1 class="about__title">Acerca de este proyecto</h1>
      <p class="about__text">
        Esta aplicación te permite chatear con Tony Stark usando inteligencia artificial.
        Fue construida con Vanilla JavaScript, Vite y la API de Google Gemini.
      </p>
      <p class="about__text">
        El personaje responde con la personalidad, el sarcasmo y la brillantez
        que caracterizan al fundador de Stark Industries.
      </p>
    </div>
  `;
}

function getNotFoundView() {
  return `
    <div class="view">
      <h1 class="home__title">404</h1>
      <p class="home__subtitle">Esta página no existe.</p>
      <a href="/home" class="home__cta">Volver al inicio</a>
    </div>
  `;
}

const routes = {
  "/": getHomeView,
  "/home": getHomeView,
  "/chat": () => '<div class="view">Cargando chat...</div>',
  "/about": getAboutView,
};

function renderView(path) {
  const viewFn = routes[path] ?? getNotFoundView;
  document.getElementById("app").innerHTML = viewFn();
  updateActiveLink(path);
}

function navigateTo(url) {
  history.pushState(null, null, url);
  renderView(new URL(url).pathname);
}

function updateActiveLink(path) {
  document.querySelectorAll('.nav__link a').forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    link.classList.toggle("active", linkPath === path);
  })
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a')
  if (!link) return;
  if (link.origin !== location.origin) return;

  e.preventDefault();
  navigateTo(link.href);
});

window.addEventListener('popstate', () => {
  renderView(location.pathname);
});

renderView(location.pathname);






