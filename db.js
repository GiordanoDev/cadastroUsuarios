// Importa a biblioteca mysql2/promise, que permite usar Promises
const mysql = require('mysql2/promise');

// Configura a conexão com o banco de dados MySQL
// Substitua 'sua_senha' pela sua senha do MySQL
const conexaoBanco = mysql.createPool({
    host: 'localhost',
    user: 'root', // Ou seu nome de usuário
    password: '', // Sua senha do MySQL Workbench
    database: 'SiteNode', // O nome do banco de dados que você criou
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exporta o 'pool' para que outros arquivos possam reutilizar a conexão
module.exports = conexaoBanco;