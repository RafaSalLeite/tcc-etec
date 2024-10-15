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
                <div class="produto">
                    <img src="${alarme.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${alarme.nome}<br>R$ ${alarme.valor}</p>
                    </div>
                </div>
                `;

                container.append(alarmeDiv);
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });
});
