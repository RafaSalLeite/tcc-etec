document.addEventListener('DOMContentLoaded', function () {
    const carrinhoItens = document.getElementById('carrinho-itens');
    const totalValor = document.getElementById('total-valor');
    const finalizarPedido = document.getElementById('finalizar-pedido');

    // Função para carregar os itens do carrinho
    function carregarCarrinho() {
        fetch('backend/models/exibir_carrinho.php')
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

    // Função para atualizar a quantidade de um produto
    function atualizarQuantidade(produtoId, novaQuantidade) {
        fetch('backend/models/atualizar_quantidade.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id_produtos=${produtoId}&quantidade=${novaQuantidade}`
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
    document.addEventListener('click', function(event) { //aqui é pra ele pegar o click do usuario
        if (event.target.classList.contains('btn-incrementar')) {
            const produtoId = event.target.dataset.id; //pega o id do produto
            const inputQuantidade = document.querySelector(`.item-quantidade[data-id="${produtoId}"]`); //pega o numero de quantidade
            let novaQuantidade = parseInt(inputQuantidade.value) + 1; //transforma em int
            inputQuantidade.value = novaQuantidade; //pega o valor
            atualizarQuantidade(produtoId, novaQuantidade); //chama a função
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
            fetch('backend/models/remover_item_carrinho.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id_produtos=${produtoId}`
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

    // Função para finalizar o pedido
    finalizarPedido.addEventListener('click', function () {
        fetch('backend/models/pedidoFinal_carrinho.php', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Pedido finalizado com sucesso!');
                carregarCarrinho(); // Limpar o carrinho após finalizar
            } else {
                alert('Erro ao finalizar o pedido');
            }
        });
    });

    // Carregar o carrinho na inicialização
    carregarCarrinho();
});
