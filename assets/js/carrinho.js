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
                            <span class="item-nome">${item.nome}</span>
                            <span class="item-preco">R$ ${item.valor}</span>
                            <input type="number" class="item-quantidade" value="${item.quantidade}" min="1">
                            <button class="remover-item" data-id="${item.id_produtos}">Remover</button>
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

    // Função para remover item do carrinho
    carrinhoItens.addEventListener('click', function (event) {
        if (event.target.classList.contains('remover-item')) {
            const produtoId = event.target.getAttribute('data-id');
            fetch(`backend/models/remover_item_carrinho.php?id_produtos=${produtoId}`, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    carregarCarrinho(); // Recarregar o carrinho após a remoção
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
        })
        
    });

    // Carregar o carrinho na inicialização
    carregarCarrinho();
});
