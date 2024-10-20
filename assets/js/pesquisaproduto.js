document.addEventListener('DOMContentLoaded', function (){
    const inputPesquisa = document.getElementById('pesquisa'); //pega o input da pesquisa
    const containerResultado = document.getElementById('containerPesquisa'); //pega o container da pesquisa

    inputPesquisa.addEventListener('input', function(){
        const query = inputPesquisa.value; //pega o valor digitado pelo usuario

        if(query.length > 2){ //aqui se ele tiver digitado mais de 2 letras ai ele vai comecar a "rodar"
            fetch(`backend/models/pesquisa.php?q=${encodeURIComponent(query)}`) //link do php
            .then(response => response.json())
            .then(data => {
                containerResultado.innerHTML = ''; //limpa o container 

                if(data.length > 0){
                    data.forEach(item => {
                        const div = document.createElement('div');
                        div.textContent = item.nome;
                        containerResultado.appendChild(div);
                    });
                } else{
                    containerResultado.innerHTML = `
                        <p>Nenhum resultado encontrado para sua busca</p>
                    `;
                }
            })

            .catch(error => {
                console.error('Erro ao buscar os dados: ', error);
            });
        } else{
            containerResultado.innerHTML = ''; //limpa dnv
        }
    })
})