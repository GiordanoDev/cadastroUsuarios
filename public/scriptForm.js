// Script para enviar os dados do formulário para o servidor
const form = document.getElementById('cadastro-form');

    form.addEventListener('submit', async (e) => {
         e.preventDefault(); // Impede o envio padrão do formulário
         //  // Cria um objeto com os dados do formulário
        const formData = new FormData(form); // cria um objeto com todas as informações preenchidas no formulário
        const usuario = Object.fromEntries(formData); // converte para um objeto javascript comum.
        try {
            // Faz uma requisição POST para a API de cadastro
            const response = await fetch('/api/usuarios', { //faz uma requisição para o servidor
                method: 'POST',// tipo post, quero enviar as informações para o servidor
                headers: {
                    'Content-Type': 'application/json' // informa que a requisição feita está no formato json
                },
                body: JSON.stringify(usuario) // Converte o objeto para JSON
            });
            // Converte a resposta para JSON
            const result = await response.json();
            if (response.ok) { // Verifica se a requisição foi bem-sucedida
                alert(result.message);
                // Redireciona de volta para a tabela
                window.location.href = 'index.html';
            } else {
                alert(`Erro: ${result.error}`);
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao tentar cadastrar o usuário. Tente novamente.');
        }
    });