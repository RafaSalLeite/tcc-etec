document.addEventListener('DOMContentLoaded', function () {
    const carrinhoItens = document.getElementById('carrinho-itens');
    const totalValor = document.getElementById('total-valor');

    // Função para carregar o carrinho
    function carregarCarrinho() {
        fetch('backend/models/carrinho.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'acao=exibir'
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    carrinhoItens.innerHTML = '';
                    let total = 0;
                    data.items.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.classList.add('item');
                        itemElement.innerHTML = `
                        <img src="${item.imagem}" class="item-img">
                        <span class="item-nome">${item.nome}</span>
                        <span class="item-preco">R$ ${item.valor}</span>

                        <div class="quantidade-container">
                            <button class="btn-decrementar" data-id="${item.id_produtos}">-</button>
                            <input type="number" class="item-quantidade" value="${item.quantidade}" min="1" data-id="${item.id_produtos}">
                            <button class="btn-incrementar" data-id="${item.id_produtos}">+</button>
                        </div>

                        <button class="remover-item" data-id="${item.id_produtos}">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    `;
                        carrinhoItens.appendChild(itemElement);
                        total += item.valor * item.quantidade;
                    });
                    totalValor.textContent = `R$ ${total.toFixed(2)}`;
                } else {
                    alert('Erro ao carregar o carrinho');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar o carrinho:', error);
            });
    }

    // Função para atualizar a quantidade de um item
    function atualizarQuantidade(produtoId, novaQuantidade) {
        fetch('backend/models/carrinho.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `acao=add&id_produtos=${produtoId}&quantidade=${novaQuantidade}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    carregarCarrinho();
                } else {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao atualizar a quantidade',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao processar a requisição!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    // Função para incrementar ou decrementar a quantidade
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-incrementar')) {
            const produtoId = event.target.dataset.id;
            const inputQuantidade = document.querySelector(`.item-quantidade[data-id="${produtoId}"]`);
            let novaQuantidade = parseInt(inputQuantidade.value) + 1;
            inputQuantidade.value = novaQuantidade;
            atualizarQuantidade(produtoId, novaQuantidade);
        } else if (event.target.classList.contains('btn-decrementar')) {
            const produtoId = event.target.dataset.id;
            const inputQuantidade = document.querySelector(`.item-quantidade[data-id="${produtoId}"]`);
            let novaQuantidade = parseInt(inputQuantidade.value) - 1;
            if (novaQuantidade < 1) novaQuantidade = 1; // Previne valores negativos
            inputQuantidade.value = novaQuantidade;
            atualizarQuantidade(produtoId, novaQuantidade);
        }
    });

    // Função para remover item do carrinho
    carrinhoItens.addEventListener('click', function (event) {
        if (event.target.classList.contains('remover-item')) {
            const produtoId = event.target.getAttribute('data-id');
            fetch('backend/models/carrinho.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `acao=delete&id_produtos=${produtoId}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        carregarCarrinho();
                    } else {
                        alert('Erro ao remover o item do carrinho');
                    }
                });
        }
    });

    
        const finalizarPedido = document.getElementById('finalizar-pedido');
        const overlay = document.getElementById('overlay');

        finalizarPedido.addEventListener('click', function () {
            fetch('backend/models/pedidoFinal_carrinho.php?action=verifica', {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        carregarEnderecos(); // Carregar endereços se o pedido for válido
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Parece que há algo de errado, confirme seus dados!',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro ao finalizar pedido:', error);
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Ocorreu um erro ao processar o pedido.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        });
    
        function carregarEnderecos() {
            fetch('backend/models/endereco.php?action=ver')
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        let enderecoHTML = `<h1 class="endereco-h1">Selecione um endereço para continuar</h1>`;
                        data.forEach(endereco => {
                            enderecoHTML += `
                                <div class="endereco">
                                    <input type="radio" name="endereco" id="endereco-${endereco.id_endereco}" value="${endereco.id_endereco}">
                                    <label for="endereco-${endereco.id_endereco}">
                                        <p><strong>Tipo:</strong> ${endereco.tipo_endereco}</p>
                                        <p><strong>CEP:</strong> ${endereco.cep}</p>
                                        <p><strong>Cidade:</strong> ${endereco.cidade}</p>
                                        <p><strong>Bairro:</strong> ${endereco.bairro}</p>
                                        <p><strong>Rua:</strong> ${endereco.rua}, ${endereco.numero}</p>
                                    </label>
                                </div>
                            `;
                        });
                        enderecoHTML += `
                            <div class="container-btn-finalizar">
                                <button class="btn-confirmar-endereco" id="confirmar-endereco">Confirmar Endereço</button>
                                <button class="btn-fechar-modal" onclick="overlay.style.visibility = 'hidden';">Cancelar</button>
                            </div>
                        `;
                        document.getElementById('enderecos-list').innerHTML = enderecoHTML;
    
                        overlay.style.visibility = 'visible';
    
                        const confirmarEndereco = document.getElementById('confirmar-endereco');
                        confirmarEndereco.addEventListener('click', function () {
                            const enderecoSelecionado = document.querySelector('input[name="endereco"]:checked');
                            if (enderecoSelecionado) {
                                const idEndereco = enderecoSelecionado.value;
                                console.log('Endereço selecionado:', idEndereco);
                                overlay.style.visibility = 'hidden';
                                Swal.fire({
                                    title: 'Endereço Selecionado!',
                                    text: 'Vamos processar seu pedido agora, um momento.',
                                    icon: 'success',
                                    confirmButtonText:  'ok',
                                   
                                });
                                mandaremail();
                               
                            } else {
                                Swal.fire({
                                    title: 'Atenção!',
                                    text: 'Por favor, selecione um endereço.',
                                    icon: 'warning',
                                    confirmButtonText: 'OK'
                                });
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Atenção!',
                            text: 'Nenhum endereço cadastrado.',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar endereços:', error);
                    document.getElementById('enderecos-list').innerHTML = `<p>Erro ao processar a requisição. Tente novamente mais tarde.</p>`;
                });
        }
    
        function mandaremail() {
            const preloader = document.getElementById('preloader');
            
            // Exibir o preloader
            preloader.style.display = 'flex';

            setTimeout(() => location.reload(), 700);   // Recarrega a página
            
            fetch('backend/models/email.php', {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        carregarCarrinho();
                        
                    } else {
                        alert('Erro ao finalizar o pedido');
                    }
                })
                .finally(() => {
                    // Esconder o preloader (caso a página não seja recarregada)
                    preloader.style.display = 'none';

                    
                    
                }); 
                
        }
           
        carregarCarrinho();
    });