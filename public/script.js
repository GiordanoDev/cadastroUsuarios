// Função para buscar os usuários da API e popular a tabela
async function carregarUsuarios() {
    const tabelaCorpo = document.getElementById('tabela-corpo');
    tabelaCorpo.innerHTML = ''; // Limpa a tabela

    try {
        // Faz uma requisição GET para a nossa API no servidor
        const response = await fetch('/api/usuarios');
        // Converte a resposta para JSON
        const usuarios = await response.json();

        // Itera sobre a lista de usuários e cria as linhas da tabela
        usuarios.forEach(usuario => {
            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.senha}</td>
                <td>
                    <button class="btn-acao btn-editar">Editar</button>
                    <button class="btn-acao btn-excluir">Excluir</button>
                </td>
            `;
            tabelaCorpo.appendChild(novaLinha);
        });

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        alert('Não foi possível carregar os usuários. Verifique o servidor.');
    }
}

// Chama a função para carregar os usuários quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarUsuarios);