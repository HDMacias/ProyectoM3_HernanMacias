# Chat con Tony Stark

Una Single Page Application (SPA) que permite conversar con Tony Stark usando inteligencia artificial. Construida con Vanilla JavaScript, Vite y Google Gemini API.

## 🎯 Características

- ✅ **Routing SPA** con History API
- ✅ **Tres vistas principales**: Home, Chat y About
- ✅ **Integración con Google Gemini AI**
- ✅ **Historial de conversación** durante la sesión
- ✅ **Responsive design** para móvil, tablet y desktop
- ✅ **Tests unitarios** con Vitest
- ✅ **Serverless Functions** para mantener la API key segura

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

- **Node.js** 16+ instalado
- **npm** o **yarn**
- Una **API key de Google Gemini** (obtén una gratis en [ai.google.dev](https://ai.google.dev/aistudio))

### Instalación

1. **Clona o descarga el proyecto**
   ```bash
   cd spa-tony-stark
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura la API key**
   - Copia el archivo `.env.example` a `.env`
   - Obtén una API key en [Google AI Studio](https://ai.google.dev/aistudio)
   - Pega tu clave en el archivo `.env`:
     ```
     GEMINI_API_KEY=tu_clave_aqui
     ```

### Desarrollo

Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Tests

Ejecuta los tests unitarios:
```bash
npm test
```

O en modo watch:
```bash
npm test -- --watch
```

### Build para producción

```bash
npm run build
```

El resultado estará en la carpeta `dist/`

## 📁 Estructura del proyecto

```
spa-tony-stark/
├── api/
│   └── funtions.js         # Serverless Function para Gemini
├── src/
│   ├── index.html          # HTML principal
│   ├── styles.css          # Estilos CSS
│   ├── app.js              # Lógica del routing SPA
│   ├── chat.js             # Lógica del chat
│   └── utils.js            # Funciones utilitarias
├── tests/
│   ├── app.test.js         # Tests del routing
│   └── utils.js            # Tests de utilidades
├── .env.example            # Template de variables de entorno
├── .gitignore              # Archivo para ignorar en git
├── package.json            # Dependencias y scripts
├── README.md               # Este archivo
└── vite.config.js          # Configuración de Vite
```

## 🔐 Seguridad

La **API key nunca se expone en el frontend**. El flujo es:

1. El cliente envía mensajes a `/api/funtions`
2. La función serverless (en el servidor) llama a Gemini con la API key
3. La respuesta se devuelve al cliente

## 🎭 Sistema de Prompt

Tony Stark responde con su característica personalidad: sarcástico, brillante, directo y con un toque de humor técnico. El system prompt define:

- Personalidad y tono
- Conocimiento del personaje
- Limitaciones y restricciones
- Respuestas cortas y apropiadas para chat

Puedes personalizar el prompt en [api/funtions.js](api/funtions.js)

## 🧪 Tests

El proyecto incluye más de 4 tests unitarios:

### Tests de utilidades (`tests/utils.js`)
- Validación de mensajes
- Sanitización de HTML
- Creación de mensajes
- Parseo de respuestas de Gemini
- Estadísticas de conversación
- Formateo de hora

### Tests de routing (`tests/app.test.js`)
- Vistas para cada ruta
- Rutas definidas correctamente
- Validación de estructura HTML

Ejecuta los tests con:
```bash
npm test
```

## 📱 Responsive Design

La aplicación es responsive y se adapta a:
- **Mobile** (320px - 768px)
- **Tablet** (768px - 1024px)
- **Desktop** (1024px+)

Prueba en diferentes tamaños con DevTools del navegador.

## 🌐 Despliegue en Vercel

1. Sube tu código a GitHub
2. Conecta el repositorio en [Vercel](https://vercel.com)
3. En Settings → Environment Variables, añade:
   ```
   GEMINI_API_KEY=tu_clave_aqui
   ```
4. Deploy automático ✨

## 🔧 Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `GEMINI_API_KEY` | API key de Google Gemini |

## 📝 Cambios y Mejoras

- Implementé **caché en memoria** para reducir llamadas a la API
- Creé funciones utilitarias testables
- Añadí validación y sanitización de mensajes
- Incluí estadísticas de conversación
- Documentación completa

## ⚠️ Notas importantes

- El historial de conversación se pierde al recargar la página
- El plan gratuito de Gemini tiene límites (60 req/min)
- La API key debe mantenerse segura (nunca en el frontend)
- El navegador debe soportar History API (todos los modernos lo hacen)

## 🤝 Contribuciones

Si encuentras bugs o tienes sugerencias, siéntete libre de reportarlos.

## 📄 Licencia

Proyecto educativo - Proyecto Integrador 3 de Henry

---

## Enlaces importantes

- Repositorio: https://github.com/HDMacias/ProyectoM3_HernanMacias
- Despliegue: https://proyecto-m3-hernan-macias.vercel.app 

---

**¿Preguntas?** Consulta la [guía oficial del proyecto](https://docs.google.com/document/d/1...) o la documentación de [Google Gemini](https://ai.google.dev/docs)
