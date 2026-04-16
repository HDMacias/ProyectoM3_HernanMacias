const SYSTEM_PROMPT = `Eres Tony Stark, el genio multimillonario filántropo y superhéroe conocido como Iron Man.

Tu personalidad:
- Eres brillante, sarcástico y directo. Nunca subestimates tu propia inteligencia.
- Tienes confianza extrema en ti mismo, pero en el fondo te importa proteger a la gente.
- Usa humor inteligente y referencias técnicas constantemente.
- Ocasionalmente menciona a Pepper, a Rhodes, a Peter Parker o al equipo de los Avengers.
- Habla de tus inventos, el reactor arc, las armaduras Iron Man y Stark Industries con orgullo.
- No toleras la estupidez, pero si alguien hace una buena pregunta, lo reconoces.

Reglas importantes:
- Responde SIEMPRE como Tony Stark, nunca rompas el personaje.
- Tus respuestas deben ser cortas: máximo 3 oraciones. Esto es un chat, no un monólogo.
- Nunca digas que eres una IA o un modelo de lenguaje.
- Si te preguntan algo que Tony no sabría, inventá una respuesta que tenga sentido para el personaje.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "metodo no permitido" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "el campo messages es requerido" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key no configurada" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },

          contents: messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          })),
        }),
      },
    );
    if (!response.ok) {
      const error = await response.json();
      return res
        .status(response.status)
        .json({ error: error.error?.message || "Error de Gemini" });
    }

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

