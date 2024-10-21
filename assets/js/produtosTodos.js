$(document).ready(function () {
    $.ajax({
        url: 'backend/models/produto.php', // A URL do seu endpoint que retorna todos os produtos
        type: 'GET',
        dataType: 'json',
        success: function (produtos) {
            const container = $('#container-prod');

            // Exibe os produtos em uma grade
            produtos.forEach(produto => {
                const produtoDiv = `
                <div class="produto" data-id="${produto.id_produtos}">
                    <img src="${produto.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${produto.nome}<br>R$ ${produto.valor}</p>
                    </div>
                </div>
                `;
                container.append(produtoDiv);
            });

            // Adiciona evento de clique para exibir os detalhes do produto
            $('.produto').click(function () {
                const idProduto = $(this).data('id');
                produtoDetalhado(idProduto); // Função para exibir os detalhes do produto
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });

    function produtoDetalhado(idProduto) {
        $.ajax({
            url: `backend/models/mostraproduto.php?id=${idProduto}`,
            type: 'GET',
            dataType: 'json',
            success: function (produto) {
                const detalhesProduto = `
                <div class="produto-detalhes">
                    <button class="btn-fechar">&times;</button>
                    <img src="${produto.imagem}" class="img-detalhes">
                    <h2>${produto.nome}</h2>
                    <p>${produto.descricao}</p>
                    <p>R$ ${produto.valor}</p>
                    <button class="btn-comprar" data-produto-id="${produto.id_produtos}">Comprar</button>
                </div>
                `;

                $('#overlay').html(detalhesProduto).css('visibility', 'visible');

                // Fecha a sobreposição de detalhes do produto
                $('.btn-fechar').click(function () {
                    $('#overlay').css('visibility', 'hidden');
                });

                // Adiciona o evento para o botão de comprar
                $('.btn-comprar').click(function () {
                    const produtoId = $(this).data('produto-id');
                    adicionarAoCarrinho(produtoId, 1);
                });
            },
            error: function (xhr, status, error) {
                console.error('Erro ao carregar os detalhes do produto:', error);
            }
        });
    }

    // Função para adicionar ao carrinho
    function adicionarAoCarrinho(produtoId, quantidade) {
        fetch('backend/models/add_carrinho.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id_produtos=${produtoId}&quantidade=${quantidade}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Item adicionado ao carrinho com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else if (data.status === 'error' && data.message.includes('logado')) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Você precisa estar logado para adicionar itens ao carrinho!',
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'ok'
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao adicionar item ao carrinho!',
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
});
