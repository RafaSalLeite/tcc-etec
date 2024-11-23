document.addEventListener('DOMContentLoaded', function (){
    const inputPesquisa = document.getElementById('pesquisa'); 
    const containerResultado = document.getElementById('containerPesquisa'); 

    inputPesquisa.addEventListener('input', function(){
        const query = inputPesquisa.value;
        if(query.length > 2){ 
            fetch(`backend/models/pesquisa.php?q=${encodeURIComponent(query)}`) 
            .then(response => response.json())
            .then(data => {
                containerResultado.innerHTML = ''; 

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
            containerResultado.innerHTML = ''; 
        }
    })
})