$(document).ready(function () {
    $.ajax({
        url: 'backend/models/produtos.php',
        type: 'GET',
        data: { acao: 'todos' },
        dataType: 'json',
        success: function (produtos) {
            const container = $('#container-prod');
            const produtosLimitados = produtos.slice(0, 5); // Exibe apenas os primeiros 5 produtos

            // Exibe os produtos principais
            produtosLimitados.forEach(produto => {
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
            url: `backend/models/produtos.php?id=${idProduto}`,
            type: 'GET',
            data: { acao: 'produto' },
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
    function adicionarAoCarrinho() {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Você precisa estar logado para adicionar itens ao carrinho!',
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Login',
                    cancelButtonText: 'Cadastro',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redireciona para a página de login
                        window.location.href = 'login.html';
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Redireciona para a página de cadastro
                        window.location.href = 'cadastro.html';
                    }
                });
    }
});
