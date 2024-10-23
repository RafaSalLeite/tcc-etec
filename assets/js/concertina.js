$(document).ready(function () {
    $.ajax({
        url: 'backend/models/concertina.php',
        type: 'GET',
        dataType: 'json',
        success: function (concertinas) {
            const container = $('#container-prod');
            const produtosLimitados = concertinas.slice(0, 5);

            produtosLimitados.forEach(concertina => {
                const concertinaDiv = `
                <div class="produto" data-id="${concertina.id_produtos}">
                    <img src="${concertina.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${concertina.nome}<br>R$ ${concertina.valor}</p>
                    </div>
                </div>
                `;
                container.append(concertinaDiv);
            });

            $('.produto').click(function () {
                const idProduto = $(this).data('id');
                produtoDetalhado(idProduto);
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

                $('.btn-fechar').click(function () {
                    $('#overlay').css('visibility', 'hidden');
                });

                $('.btn-comprar').click(function () {
                    const produtoId = $(this).data('produto-id');
                    adicionarAoCarrinho(produtoId, 1);
                });
            }
        });
    }

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
                    confirmButtonText: 'OK'
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
