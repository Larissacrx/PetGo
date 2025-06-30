// script.js

function initChat() {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const toggleChatBtn = document.getElementById('toggle-chat');

    let isChatExpanded = true;

    function addMessage(text, isUser  = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex mb-4 ${isUser  ? 'justify-end' : 'justify-start'}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = `message-bubble rounded-xl p-3 ${isUser  ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 shadow-sm'}`;
        bubbleDiv.innerHTML = text;
        
        messageDiv.appendChild(bubbleDiv);
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function sendMessageToBackend(message) {
        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            addMessage(data.reply);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            addMessage("Desculpe, ocorreu um erro ao enviar sua mensagem.");
        }
    }

    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            sendMessageToBackend(message);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                sendMessageToBackend(message);
            }
        }
    });

    toggleChatBtn.addEventListener('click', () => {
        isChatExpanded = !isChatExpanded;
        chatContainer.classList.toggle('hidden', !isChatExpanded);
        toggleChatBtn.innerHTML = isChatExpanded ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
    });
}

// Função para adicionar item ao carrinho
async function addItemToCart(item) {
    try {
        const response = await fetch('http://localhost:3000/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item })
        });

        const data = await response.json();
        alert(data.message); // Exibe mensagem de confirmação
    } catch (error) {
        console.error("Erro ao adicionar item ao carrinho:", error);
        alert("Desculpe, ocorreu um erro ao adicionar o item ao carrinho.");
    }
}

// Inicializa o chat e adiciona eventos aos botões de adicionar ao carrinho
document.addEventListener('DOMContentLoaded', () => {
    initChat();

    // Adiciona eventos aos botões de adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = JSON.parse(button.getAttribute('data-item'));
            addItemToCart(item);
        });
    });
});
