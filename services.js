

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Armazenar itens do carrinho em memória
let cart = [];

// Endpoint para adicionar um item ao carrinho
app.post('/api/cart/add', (req, res) => {
    const item = req.body.item;
    if (item) {
        cart.push(item);
        return res.json({ message: 'Item adicionado ao carrinho!', cart });
    }
    return res.status(400).json({ message: 'Item inválido!' });
});

// Endpoint para visualizar o carrinho
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Endpoint para o chatbot
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    const botReply = `Você disse: ${userMessage}`;
    res.json({ reply: botReply });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


// Endpoint para visualizar o carrinho
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

