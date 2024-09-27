document.getElementById('addBtn').addEventListener('click', function() {
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question && answer) {
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard';
        flashcard.innerHTML = `
            <strong>Pergunta:</strong> ${question} <br>
            <strong>Resposta:</strong> ${answer}
        `;
        
        document.getElementById('flashcards').appendChild(flashcard);

        // Limpar os inputs
        questionInput.value = '';
        answerInput.value = '';
    } else {
        alert('Por favor, preencha tanto a pergunta quanto a resposta!');
    }
});
