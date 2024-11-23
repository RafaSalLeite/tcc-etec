document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cep');
    const cidadeInput = document.getElementById('cidade');
    const bairroInput = document.getElementById('bairro');
    const ruaInput = document.getElementById('rua');

    cepInput.addEventListener('blur', function () {
        const cep = cepInput.value.replace(/\D/g, ''); 
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        cidadeInput.value = data.localidade || '';
                        bairroInput.value = data.bairro || '';
                        ruaInput.value = data.logradouro || '';
                    } else {
                        alert('CEP não encontrado. Verifique e tente novamente.');
                    }
                })
                .catch(() => alert('Erro ao consultar o CEP. Tente novamente mais tarde.'));
        } else {
            alert('CEP inválido. Certifique-se de que ele contém 8 dígitos.');
        }
    });
});
