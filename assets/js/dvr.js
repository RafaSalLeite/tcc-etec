$(document).ready(function () {
    
    
    $.ajax({
        url: 'backend/models/dvrs.php',
        type: 'GET',
        dataType: 'json',
        success: function (dvrs) {
            console.log('Câmeras recebidos:', dvrs);

            const container = $('#container-prod');

            const produtosLimitados = dvrs.slice(0, 5);

            produtosLimitados.forEach(dvr => {
                console.log('Adicionando câmera:',dvrs.nome);

                const dvrDiv = `
                <div class="produto">
                    <img src="${dvr.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${dvr.nome}<br>R$ ${dvr.valor}</p>
                    </div>
                </div>
                `;

                container.append(dvrDiv); 
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });
});
