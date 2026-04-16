/**
 * Valida que un mensaje tenga contenido válido
 * @param {string} text - Texto del mensaje
 * @returns {boolean} - true si el mensaje es válido
 */
export function isValidMessage(text) {
  if (typeof text !== 'string') return false;
  return text.trim().length > 0;
}

/**
 * Sanitiza un mensaje para evitar inyecciones de código
 * @param {string} text - Texto a sanitizar
 * @returns {string} - Texto sanitizado
 */
export function sanitizeMessage(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formatea un mensaje con rol específico
 * @param {string} role - 'user' | 'stark' | 'error'
 * @param {string} text - Contenido del mensaje
 * @returns {object} - Objeto con rol y texto
 */
export function createMessage(role, text) {
  if (!['user', 'stark', 'error'].includes(role)) {
    throw new Error(`Rol inválido: ${role}`);
  }
  if (!isValidMessage(text) && role !== 'error') {
    throw new Error('El mensaje no puede estar vacío');
  }
  return { role, text };
}

/**
 * Parsea la respuesta de Gemini API
 * @param {object} data - Respuesta JSON de Gemini
 * @returns {string} - Texto extraído de la respuesta
 */
export function parseGeminiResponse(data) {
  try {
    if (!data || !data.candidates || data.candidates.length === 0) {
      throw new Error('Respuesta vacía de Gemini');
    }
    const reply = data.candidates[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      throw new Error('Formato de respuesta inesperado');
    }
    return reply;
  } catch (error) {
    throw new Error(`Error al parsear respuesta: ${error.message}`);
  }
}

/**
 * Calcula estadísticas de una conversación
 * @param {array} messages - Array de mensajes
 * @returns {object} - Estadísticas de la conversación
 */
export function getConversationStats(messages) {
  if (!Array.isArray(messages)) {
    return { total: 0, userMessages: 0, starkMessages: 0 };
  }
  return {
    total: messages.length,
    userMessages: messages.filter(m => m.role === 'user').length,
    starkMessages: messages.filter(m => m.role === 'stark').length,
  };
}

/**
 * Formatea la hora actual en formato HH:MM
 * @returns {string} - Hora formateada
 */
export function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
