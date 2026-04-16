const messages = [];

function renderMessages() {
  const container = document.getElementById("messages");
  if (!container) return;

  container.innerHTML = messages
    .map(
      (msg) => `
    <div class="message message--${msg.role}">
    ${msg.text}
    </div>  
  `,
    )
    .join("");
  container.scrollTop = container.scrollHeight;
}

function addMessage(role, text) {
  messages.push({ role, text });
  renderMessages();
}

function addLoadingMessage() {
  const container = document.getElementById("messages");
  if (!container) return;

  const div = document.createElement("div");
  div.className = "message message--loading";
  div.id = "loading-message";
  div.textContent = "Tony está pensando...";
  container.scrollTop = container.scrollHeight;
}

function removeLoadingMessage() {
  const loading = document.getElementById("loading-message");
  if (loading) loading.remove();
}

async function handleSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("chat-input");
  const button = document.getElementById("chat-button");
  const text = input.value.trim();

  if (!text) return;

  input.value = "";
  input.disabled = true;
  button.disabled = true;

  addMessage("user", text);
  addLoadingMessage();

  setTimeout(() => {
    removeLoadingMessage();
    addMessage(
      "stark",
      "¿Eso es lo mejor que tienes? Yo construí una armadura en una cueva.",
    );
    input.disabled = false;
    button.disabled = false;
    input.focus();
  }, 1000);
}

export function getChatView() {
  return `
  <div class="view chat">
      <div class="chat__messages" id="messages"></div>
      <form class="chat__form" id="chat-form">
        <input
          class="chat__input"
          id="chat-input"
          type="text"
          placeholder="Escribile a Tony..."
          autocomplete="off"
        />
        <button class="chat__button" id="chat-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  `;
}

export function initChat() {
  const form = document.getElementById("chat-form");
  if (!form) return;
  form.addEventListener("submit", handleSubmit);

  if (messages.length === 0) {
    addMessage(
      "stark",
      "¿En qué te puedo ayudar? Y por favor, haz una pregunta inteligente.",
    );
  } else {
    renderMessages();
  }
}


