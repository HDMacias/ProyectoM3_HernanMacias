import { describe, it, expect } from 'vitest';
import {
  isValidMessage,
  sanitizeMessage,
  createMessage,
  parseGeminiResponse,
  getConversationStats,
  getCurrentTime,
} from '../src/utils.js';

describe('isValidMessage', () => {
  it('debería retornar true para mensajes válidos', () => {
    expect(isValidMessage('Hola')).toBe(true);
    expect(isValidMessage('  Mensaje con espacios  ')).toBe(true);
  });

  it('debería retornar false para mensajes vacíos', () => {
    expect(isValidMessage('')).toBe(false);
    expect(isValidMessage('   ')).toBe(false);
  });

  it('debería retornar false para no-strings', () => {
    expect(isValidMessage(null)).toBe(false);
    expect(isValidMessage(undefined)).toBe(false);
    expect(isValidMessage(123)).toBe(false);
    expect(isValidMessage({})).toBe(false);
  });
});

describe('sanitizeMessage', () => {
  it('debería escapar caracteres HTML peligrosos', () => {
    expect(sanitizeMessage('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
    expect(sanitizeMessage('Hola & adiós')).toBe('Hola &amp; adiós');
  });

  it('debería mantener texto normal sin cambios', () => {
    expect(sanitizeMessage('Hola mundo')).toBe('Hola mundo');
    expect(sanitizeMessage('123')).toBe('123');
  });

  it('debería retornar string vacío para valores no válidos', () => {
    expect(sanitizeMessage(null)).toBe('');
    expect(sanitizeMessage(undefined)).toBe('');
    expect(sanitizeMessage(123)).toBe('');
  });
});

describe('createMessage', () => {
  it('debería crear un mensaje válido', () => {
    const msg = createMessage('user', 'Hola Tony');
    expect(msg).toEqual({ role: 'user', text: 'Hola Tony' });
  });

  it('debería lanzar error para rol inválido', () => {
    expect(() => createMessage('invalid', 'texto')).toThrow('Rol inválido');
  });

  it('debería lanzar error para mensaje vacío (excepto error)', () => {
    expect(() => createMessage('user', '   ')).toThrow('no puede estar vacío');
  });

  it('debería permitir role "error" con cualquier texto', () => {
    const msg = createMessage('error', 'Algo salió mal');
    expect(msg.role).toBe('error');
  });
});

describe('parseGeminiResponse', () => {
  it('debería extraer el texto de una respuesta válida', () => {
    const response = {
      candidates: [
        {
          content: {
            parts: [{ text: 'Respuesta de Tony' }],
          },
        },
      ],
    };
    expect(parseGeminiResponse(response)).toBe('Respuesta de Tony');
  });

  it('debería lanzar error para respuesta vacía', () => {
    expect(() => parseGeminiResponse(null)).toThrow();
    expect(() => parseGeminiResponse({})).toThrow();
    expect(() => parseGeminiResponse({ candidates: [] })).toThrow();
  });

  it('debería lanzar error para formato inesperado', () => {
    expect(() =>
      parseGeminiResponse({
        candidates: [{ content: { parts: [] } }],
      })
    ).toThrow();
  });
});

describe('getConversationStats', () => {
  it('debería contar mensajes correctamente', () => {
    const messages = [
      { role: 'user', text: 'Hola' },
      { role: 'stark', text: 'Hola' },
      { role: 'user', text: 'Cómo estás?' },
      { role: 'stark', text: 'Bien' },
    ];
    const stats = getConversationStats(messages);
    expect(stats.total).toBe(4);
    expect(stats.userMessages).toBe(2);
    expect(stats.starkMessages).toBe(2);
  });

  it('debería retornar ceros para array vacío', () => {
    const stats = getConversationStats([]);
    expect(stats.total).toBe(0);
    expect(stats.userMessages).toBe(0);
    expect(stats.starkMessages).toBe(0);
  });

  it('debería retornar valores por defecto para input inválido', () => {
    const stats = getConversationStats(null);
    expect(stats.total).toBe(0);
  });
});

describe('getCurrentTime', () => {
  it('debería retornar un string en formato HH:MM', () => {
    const time = getCurrentTime();
    expect(time).toMatch(/^\d{2}:\d{2}$/);
  });

  it('debería retornar valores entre 00:00 y 23:59', () => {
    const time = getCurrentTime();
    const [hours, minutes] = time.split(':').map(Number);
    expect(hours).toBeGreaterThanOrEqual(0);
    expect(hours).toBeLessThan(24);
    expect(minutes).toBeGreaterThanOrEqual(0);
    expect(minutes).toBeLessThan(60);
  });
});
