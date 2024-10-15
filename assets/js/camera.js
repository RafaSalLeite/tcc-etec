$(document).ready(function () {
    
    
    $.ajax({
        url: 'backend/models/cameras.php',
        type: 'GET',
        dataType: 'json',
        success: function (cameras) {
            console.log('Câmeras recebidos:', cameras);

            const container = $('#container-prod');

            const produtosLimitados = cameras.slice(0, 5);

            produtosLimitados.forEach(camera => {
                console.log('Adicionando câmera:',cameras.nome);

                const cameraDiv = `
                <div class="produto">
                    <img src="${camera.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${camera.nome}<br>R$ ${camera.valor}</p>
                    </div>
                </div>
                `;

                container.append(cameraDiv); 
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });
});
