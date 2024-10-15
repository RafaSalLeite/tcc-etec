$(document).ready(function () {
    console.log('Iniciando AJAX');
    
    $.ajax({
        url: 'backend/models/produto.php',
        type: 'GET',
        dataType: 'json',
        success: function (produtos) {
            console.log('Produtos recebidos:', produtos);

            const container = $('#container-prod');

            const produtosLimitados = produtos.slice(0, 5);

            produtosLimitados.forEach(produto => {
                console.log('Adicionando produto:', produto.nome);

                const produtoDiv = `
                <div class="produto">
                    <img src="${produto.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${produto.nome}<br>R$ ${produto.valor}</p>
                    </div>
                </div>
                `;

                container.append(produtoDiv); 
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });
});
