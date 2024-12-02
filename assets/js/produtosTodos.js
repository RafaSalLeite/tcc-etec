$(document).ready(function () {
    const inputPesquisa = document.getElementById('pesquisa');
    const containerResultado = document.getElementById('containerPesquisa');

    inputPesquisa.addEventListener('input', function () {
        const query = inputPesquisa.value;
        if (query.length > 2) {
            fetch(`backend/models/pesquisa.php?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    containerResultado.innerHTML = '';

                    if (data.length > 0) {
                        data.forEach(item => {
                            
                            const div = document.createElement('div');

                           
                            const nome = document.createElement('span');
                            nome.textContent = item.nome;

                            
                            const btnVerMais = document.createElement('button');
                            btnVerMais.textContent = 'ver mais';
                            btnVerMais.classList.add('btn-pesquisa');
                            btnVerMais.addEventListener('click', function () {
                                produtoDetalhado(item.id_produtos); 
                            });

                            // Adicionando os elementos ao container
                            div.appendChild(nome);
                            div.appendChild(btnVerMais);
                            containerResultado.append(div);
                        });
                    } else {
                        containerResultado.innerHTML = `
                            <p>Nenhum resultado encontrado para sua busca</p>
                        `;
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar os dados: ', error);
                });
        } else {
            containerResultado.innerHTML = '';
        }
    });

    
    $.ajax({
        url: 'backend/models/produtos.php', 
        type: 'GET',
        data: { acao: 'todos'},
        dataType: 'json',
        success: function (produtos) {
            const container = $('#container-prod');

            // essa parte aqui é pra exibição de todos os produtos 
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

            
            $('.produto').click(function () {
                const idProduto = $(this).data('id');
                produtoDetalhado(idProduto); 
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });

    //aqui é a janelinha que ele abre pra exibir o produto tem no index também
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
                    <div>
                        <img src="${produto.imagem}" class="img-detalhes">
                    </div>
                    <h2>${produto.nome}</h2>
                    <h4>${produto.descricao}</h4>
                    <p class="pinto">R$ ${produto.valor}</p>
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
                    adicionarAoCarrinho(produtoId, 1); //chama a função adicionar ao carrinho
                });
            },
            error: function (xhr, status, error) {
                console.error('Erro ao carregar os detalhes do produto:', error);
            }
        });
    }

    //função adicionar ao carrinho
    function adicionarAoCarrinho(produtoId, quantidade) {
        fetch('backend/models/carrinho.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `acao=add&id_produtos=${produtoId}&quantidade=${quantidade}`
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
