$(document).ready(function () {
    
    
    $.ajax({
        url: 'backend/models/cercas.php',
        type: 'GET',
        dataType: 'json',
        success: function (cercas) {
            console.log('Câmeras recebidos:', cercas);

            const container = $('#container-prod');

            const produtosLimitados = cercas.slice(0, 5);

            produtosLimitados.forEach(cerca => {
                console.log('Adicionando câmera:',cercas.nome);

                const cercaDiv = `
                <div class="produto">
                    <img src="${cerca.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${cerca.nome}<br>R$ ${cerca.valor}</p>
                    </div>
                </div>
                `;

                container.append(cercaDiv); 
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });
});
