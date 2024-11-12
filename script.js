// Configuration for fly animation and messages
const flyCount = 10; // Number of flies
const flyContainer = document.getElementById("fly-container");
const messageContainer = document.getElementById("message-container");
const messages = []; // Array to store messages for auto-expiry

// Generate random position within viewport
function getRandomPosition() {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    return { x, y };
}

// Function to create flies
function createFlies() {
    for (let i = 0; i < flyCount; i++) {
        const fly = document.createElement("div");
        fly.classList.add("fly");

        // Random initial position
        const { x, y } = getRandomPosition();
        fly.style.left = `${x}px`;
        fly.style.top = `${y}px`;

        // Move the fly periodically
        animateFly(fly);
        flyContainer.appendChild(fly);
    }
}

// Function to animate each fly
function animateFly(fly) {
    setInterval(() => {
        const { x, y } = getRandomPosition();
        fly.style.transform = `translate(${x - fly.offsetLeft}px, ${y - fly.offsetTop}px)`;
    }, Math.random() * 2000 + 1000); // Randomize movement interval
}

// Handle user message submission
document.getElementById("send-button").addEventListener("click", postMessage);

function postMessage() {
    const chatInput = document.getElementById("chat-input");
    const text = chatInput.value.trim();

    // Only proceed if text is not empty
    if (text) {
        const message = document.createElement("div");
        message.classList.add("message");
        message.textContent = text;

        // Position the message randomly
        const { x, y } = getRandomPosition();
        message.style.left = `${x}px`;
        message.style.top = `${y}px`;

        messageContainer.appendChild(message);
        messages.push({ element: message, timestamp: Date.now() }); // Track message

        // Clear input
        chatInput.value = "";

        // Auto-remove message after 24 hours
        setTimeout(() => {
            message.remove();
        }, 86400000); // 24 hours in milliseconds
    }
}

// Remove old messages automatically
function cleanupMessages() {
    const now = Date.now();
    messages.forEach((msg, index) => {
        if (now - msg.timestamp >= 86400000) { // Check if message is older than 24 hours
            msg.element.remove();
            messages.splice(index, 1); // Remove message from array
        }
    });
}

// Run cleanup every hour
setInterval(cleanupMessages, 3600000);

// Initialize flies on page load
createFlies();
