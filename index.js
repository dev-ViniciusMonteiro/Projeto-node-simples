// Importando os módulos
const express = require('express');
const axios = require('axios');

// Inicializando o aplicativo Express
const app = express();

// Definindo a rota para consulta de CEP
app.get('/consultar-cep/:cep', async (req, res) => {
  const cep = req.params.cep;
  const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await axios.get(viaCepUrl);
    const data = response.data;
    
    if (data.erro) {
      res.status(404).json({ error: 'CEP não encontrado' });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Iniciando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
