$(document).ready(function () {
    
    
    $.ajax({
        url: 'backend/models/concertina.php',
        type: 'GET',
        dataType: 'json',
        success: function (concertinas) {
            console.log('Câmeras recebidos:', concertinas);

            const container = $('#container-prod');

            const produtosLimitados = concertinas.slice(0, 5);

            produtosLimitados.forEach(concertina => {
                console.log('Adicionando câmera:',concertinas.nome);

                const concertinaDiv = `
                <div class="produto">
                    <img src="${concertina.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${concertina.nome}<br>R$ ${concertina.valor}</p>
                    </div>
                </div>
                `;

                container.append(concertinaDiv); 
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });
});
