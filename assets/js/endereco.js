document.getElementById('cep').addEventListener('input', function (e) {
    let cep = e.target.value;

    cep = cep.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }

    e.target.value = cep;
});