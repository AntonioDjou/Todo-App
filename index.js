const express = require('express');
const app = express();
app.use(express.json()); // Middleware para analisar o corpo das requisições como JSON

let tasks = [];
const authToken = 'seu-token-simples'; // Nosso token "simples"

// Middleware para verificar o token (pode ser usado em rotas específicas)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === authToken) {
    next(); // Token válido, permite a próxima ação (a rota)
  } else {
    res.status(403).json({ message: 'Acesso proibido. Token inválido.' });
  }
};

// Rota de login
app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  const username = 'admin';
  const password = 'senha123';
  if (user === username && pass === password) {
    return res.json({ message: 'Login bem-sucedido', token: authToken });
  } else {
    return res.status(401).json({ message: 'Usuário ou senha incorretos' });
  }
});

// Rota para a página inicial (opcional)
app.get('/', (req, res) => {
  res.send('Bem-vindo à sua API de lista de tarefas!');
});

// Rota para listar todas as tarefas (GET /tasks) - PROTEGIDA
app.get('/tasks', authenticateToken, (req, res) => {
  res.json(tasks);
});

// Rota para adicionar uma nova tarefa (POST /task) - PROTEGIDA
app.post('/task', authenticateToken, (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.status(201).json({ message: 'Tarefa adicionada com sucesso!', task });
  } else {
    res.status(400).json({ error: 'Por favor, forneça a tarefa no corpo da requisição.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});