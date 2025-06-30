const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());

app.post('/api/openai', async (req, res) => {
  const { context, question } = req.body;
  try {
    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um assistente útil." },
        { role: "assistant", content: context },
        { role: "user", content: question }
      ]
    });

    const result = gptResponse.data.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error('Erro com OpenAI:', error);
    res.status(500).json({ error: error.message || 'Erro desconhecido' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
