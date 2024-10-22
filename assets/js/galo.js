// Seleciona todas as perguntas do FAQ
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;

        // Alterna a classe "active" para mostrar ou esconder a resposta
        faqItem.classList.toggle('active');
    });
});
