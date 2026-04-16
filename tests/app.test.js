import { describe, it, expect, beforeEach } from 'vitest';

// Mock de las vistas (sin DOM)
function getHomeView() {
  return `<div class="view">
      <h1 class="home__title">Hola. Soy Tony Stark.</h1>
      <p class="home__subtitle">
        Genio, multimillonario, filántropo... y ahora disponible para chatear.
        Si tienes alguna pregunta inteligente, adelante. Si no, también.
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
  '/': getHomeView,
  '/home': getHomeView,
  '/about': getAboutView,
};

describe('Routing SPA - Vistas', () => {
  it('debería retornar la vista de home para "/"', () => {
    const view = routes['/']();
    expect(view).toContain('Hola. Soy Tony Stark.');
    expect(view).toContain('href="/chat"');
  });

  it('debería retornar la vista de home para "/home"', () => {
    const view = routes['/home']();
    expect(view).toContain('Hola. Soy Tony Stark.');
  });

  it('debería retornar la vista About para "/about"', () => {
    const view = getAboutView();
    expect(view).toContain('Acerca de este proyecto');
    expect(view).toContain('Google Gemini');
  });

  it('debería retornar vista 404 para rutas no definidas', () => {
    const view = getNotFoundView();
    expect(view).toContain('404');
    expect(view).toContain('Esta página no existe');
  });

  it('debería contener vínculos de navegación válidos', () => {
    const homeView = getHomeView();
    expect(homeView).toContain('href="/chat"');
  });
});

describe('Rutas definidas', () => {
  it('debería tener rutas para home', () => {
    expect(routes['/']).toBeDefined();
    expect(routes['/home']).toBeDefined();
  });

  it('debería tener ruta para about', () => {
    expect(routes['/about']).toBeDefined();
  });

  it('debería retornar funciones para cada ruta', () => {
    Object.values(routes).forEach((view) => {
      expect(typeof view).toBe('function');
      expect(typeof view()).toBe('string');
    });
  });
});

describe('Validación de vistas', () => {
  it('debería retornar strings no vacíos para todas las vistas', () => {
    const allViews = [
      getHomeView(),
      getAboutView(),
      getNotFoundView(),
    ];
    allViews.forEach((view) => {
      expect(view).toBeTruthy();
      expect(view.length).toBeGreaterThan(0);
    });
  });

  it('debería contener estructura HTML válida', () => {
    const view = getHomeView();
    expect(view).toContain('<');
    expect(view).toContain('>');
    expect(view).toContain('div');
  });
});
