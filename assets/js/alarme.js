$(document).ready(function () {

    $.ajax({
        url: 'backend/models/alarmes.php',
        type: 'GET',
        dataType: 'json',
        success: function (alarme) {
            console.log('Alarmes recebidos:', alarme);

            const container = $('#container-prod');

            const produtosLimitados = alarme.slice(0, 5);

            produtosLimitados.forEach(alarme => {
                console.log('Adicionando câmera:', alarme.nome);

                const alarmeDiv = `
                <div class="produto" data-id="${alarme.id_produtos}">
                    <img src="${alarme.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${alarme.nome}<br>R$ ${alarme.valor}</p>
                    </div>
                </div>
                `;

                container.append(alarmeDiv);
            });
            
            //pega o id dos produtos
            $('.produto').click(function () {
                const idProduto = $(this).data('id');
                produtoDetalhado(idProduto); //função pra pegar os detalhes do produto
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });

    function produtoDetalhado(idProduto) {
        $.ajax({
            url: `backend/models/mostraproduto.php?id=${idProduto}`, //aqui tem interpolação pra mandar o id do produto pro mostraproduto.php
            type: 'GET',
            dataType: 'json',
            success: function (produto) {
                const detalhesProduto = //essa parte aqui vai exibir os detalhes do produto
                    `
                    
                    <div class="produto-detalhes">
                        <button class="btn-fechar">&times;</button>
                        <img src="${produto.imagem}" class="img-detalhes">
                        <h2>${produto.nome}</h2>
                        <p>${produto.descricao}</p>
                        <p>R$ ${produto.valor}</p>
                        <button class="btn-comprar">Comprar</button>
                    </div>
                    `
                    ;

                $('#overlay').html(detalhesProduto).css('visibility', 'visible'); //aqui ele troca no css o overlay que estava invisível para visível

                $('.btn-fechar').click(function () { // e aqui quando você clica no botão de fecha (o x) ele troca o css pra hidden
                    $('#overlay').css('visibility', 'hidden'); // Esconde a sobreposição
                });
            }
        });
    }
});
