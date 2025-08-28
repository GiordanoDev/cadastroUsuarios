const express = require('express');
const path = require('path');
const db = require('./db'); // Importa o arquivo de conexão que acabamos de criar
const app = express();
const port = 3000;
// Middleware para processar requisições com JSON
app.use(express.json());
// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota GET para buscar todos os usuários do banco de dados
app.get('/api/usuarios', async (req, res) => {
    try {
        // Executa a query SQL para selecionar todos os usuários
        // 'await' espera a resposta do banco antes de prosseguir
        const [rows] = await db.execute('SELECT id, nome, email, usuario, senha FROM usuarios');
        // Retorna os dados como resposta JSON
        res.json(rows);
    } catch (error) {
        // Em caso de erro, exibe no console e retorna um status de erro
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/usuarios', async (req, res) => {
    // Pega os dados do corpo da requisição (formulário)
    const { nome, email, usuario, senha } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !usuario || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Executa a query SQL para inserir um novo registro
        const query = 'INSERT INTO usuarios (nome, email, usuario, senha) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [nome, email, usuario, senha]);
        // Retorna a resposta de sucesso com o ID do novo usuário
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        // Retorna um erro se, por exemplo, o e-mail ou usuário já existir
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

// ---------------------- ROTAS DE SERVIÇO DE PÁGINAS ----------------------

// Rota principal para a página inicial (tabela)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a página do formulário
app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});