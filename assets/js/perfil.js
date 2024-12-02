document.addEventListener('DOMContentLoaded', function () {
    const perfilContainer = document.getElementById('perfil-container');
    const enderecoContainer = document.getElementById('endereco-container');

        function carregarPerfil() {
            fetch('backend/models/perfil.php')
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        perfilContainer.innerHTML = `
                            <div class="perfil">
                                <div class="container-welcome">
                                    <h1>OLÁ, ${data.usuario.nome}</h1>
                                    <h3>${data.usuario.email}</h3>
                                </div>
                                <div class="container-btn-edit">
                                    <button class="btn-edit">
                                        <img src="assets/img/Edit.png" alt="">Editar
                                    </button>
                                </div>
                                <div class="container-btn-delete">
                                    <button class="btn-delete">
                                        <img src="assets/img/Delete.png" alt="">Deletar Conta
                                    </button>
                                </div>
                            </div>
        
                            <div class="perfil-dados">
                                <h1>Dados Pessoais</h1>
                                <div class="nome">
                                    <div class="campo">
                                        <label for="nome">Nome</label><br>
                                        <input class="input-cadastro" type="text" id="nome" name="nome" value="${data.usuario.nome}" readonly>
                                    </div>   
                                </div>
                                <div class="sobrenome">
                                    <div class="campo">
                                        <label for="sobrenome">Sobrenome</label><br>
                                        <input class="input-cadastro" type="text" id="sobrenome" name="sobrenome" value="${data.usuario.sobrenome}" readonly>
                                    </div>
                                </div>
                                <div class="email">
                                    <div class="campo">
                                        <label for="email">Email</label><br>
                                        <input class="input-cadastro" type="email" id="email" name="email" value="${data.usuario.email}" readonly>
                                    </div>
                                </div>
                                <div class="senha">
                                    <div class="campo">
                                        <label for="senha">Senha</label><br>
                                        <input class="input-cadastro" type="text" id="senha" name="senha" value="${data.usuario.senha}" readonly>
                                    </div>
                                </div>
                                <div class="telefone">
                                    <div class="campo">
                                        <label for="telefone">Telefone</label><br>
                                        <input class="input-cadastro" type="tel" id="telefone" name="telefone" value="${data.usuario.telefone}" pattern="[0-9]{2}[0-9]{5}[0-9]{4}" readonly>
                                    </div> 
                                </div>
                            </div>
                        `;
        
                        let isEditing = false;
                        const btnEdit = document.querySelector('.btn-edit');
                        btnEdit.addEventListener('click', () => {
                            const inputs = document.querySelectorAll('.input-cadastro');
                            if (isEditing) {
                                const nome = document.getElementById('nome').value;
                                const sobrenome = document.getElementById('sobrenome').value;
                                const email = document.getElementById('email').value;
                                const senha = document.getElementById('senha').value;
                                const telefone = document.getElementById('telefone').value;
        
                                fetch('backend/models/perfil.php?action=update', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ nome, sobrenome, email, senha, telefone })
                                })
                                .then(response => response.json())
                                .then(res => {
                                    Swal.fire({
                                        title: res.status === 'success' ? 'Sucesso!' : 'Erro!',
                                        text: res.message,
                                        icon: res.status === 'success' ? 'success' : 'error',
                                        confirmButtonText: 'OK'
                                    });
                                    if (res.status === 'success') carregarPerfil();
                                })
                                .catch(error => console.error('Erro ao atualizar perfil:', error));
                            } else {
                                inputs.forEach(input => input.removeAttribute('readonly'));
                                btnEdit.innerHTML = '<img src="assets/img/Save.png" alt="">Salvar';
                            }
                            isEditing = !isEditing;
                        });
    
                        //botão do delete
                        document.querySelector('.btn-delete').addEventListener('click', () => {
                            Swal.fire({
                                title: 'Tem certeza?',
                                text: 'Sua conta será excluída permanentemente.',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Sim, deletar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    const preloader = document.getElementById('preloader');
                                    const preloaderText = document.getElementById('preloader-text');
                                    
                                    // Exibir o preloader e definir mensagem
                                    preloader.style.display = 'flex';
                                    preloaderText.textContent = 'Aguarde um momento, apagando seus dados...';
                        
                                    fetch(`backend/models/perfil.php?action=delete&id_user=${data.usuario.id_user}`, { method: 'POST' })
                                        .then(response => response.json())
                                        .then(res => {
                                            Swal.fire({
                                                title: res.status === 'success' ? 'Sucesso!' : 'Erro!',
                                                text: res.message,
                                                icon: res.status === 'success' ? 'success' : 'error',
                                                confirmButtonText: 'OK'
                                            }).then(() => {
                                                if (res.status === 'success') {
                                                    window.location.href = 'index.html';
                                                }
                                            });
                                        })
                                        .catch(error => console.error('Erro ao deletar conta:', error))
                                        .finally(() => {
                                            preloader.style.display = 'none'; // Ocultar o preloader
                                        });
                                }
                            });
                        });
                                             
                    } else {
                        perfilContainer.innerHTML = `<p class="nenhum">Erro ao carregar perfil do usuário. Tente novamente mais tarde.</p>`;
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar perfil:', error);
                    perfilContainer.innerHTML = `<p>Erro ao processar a requisição. Tente novamente mais tarde.</p>`;
                });
        }
    function carregarEnderecos() {
        fetch('backend/models/endereco.php?action=ver')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let enderecoHTML = `<h1 class="endereco-h1">Endereços</h1>`;
                    data.forEach(endereco => {
                        enderecoHTML += `
                            <div class="endereco">
                                <p><strong>Tipo:</strong> ${endereco.tipo_endereco}</p>
                                <p><strong>CEP:</strong> ${endereco.cep}</p>
                                <p><strong>Cidade:</strong> ${endereco.cidade}</p>
                                <p><strong>Bairro:</strong> ${endereco.bairro}</p>
                                <p><strong>Rua:</strong> ${endereco.rua}, ${endereco.numero}</p>
                               
                                <div class="container-btn-delete-endereco">
                                <button class="btn-delete-endereco " data-id="${endereco.id_endereco}">
                                    <img src="assets/img/Delete.png" alt="">Deletar Endereço
                                </button>
                                 </div>
                            </div>
                        `;
                    });
                    enderecoHTML += `<button class="btn-add-endereco">+ Adicionar Endereço</button>`;
                    enderecoContainer.innerHTML = enderecoHTML;

                   
                    document.querySelector('.btn-add-endereco').addEventListener('click', () => {
                        window.location.href = 'endereco.html';
                    });

                   
                    document.querySelectorAll('.btn-delete-endereco').forEach(button => {
                        button.addEventListener('click', () => {
                            const enderecoId = button.getAttribute('data-id');
                            deletarEndereco(enderecoId);
                        });
                    });
                } else {
                    enderecoContainer.innerHTML = `<p class="nenhum">Nenhum endereço cadastrado.</p>
                    <button class="btn-add-endereco">+ Adicionar Endereço</button>`;
                    document.querySelector('.btn-add-endereco').addEventListener('click', () => {
                        window.location.href = 'endereco.html';
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao carregar endereços:', error);
                enderecoContainer.innerHTML = `<p>Erro ao processar a requisição. Tente novamente mais tarde.</p>`;
            });
    }

    
    function deletarEndereco(idEndereco) {
        fetch(`backend/models/endereco.php?action=deletar&id_endereco=${idEndereco}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Endereço excluído com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    carregarEnderecos();
                } else if (data.status === 'error' && data.message.includes('logado')) {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Houve um erro ao excluir o endereço!',
                        icon: 'error',
                        showCancelButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(error => console.error('Erro ao deletar o endereço:', error));
    }

    carregarPerfil();
    carregarEnderecos();
});
