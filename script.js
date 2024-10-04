document.addEventListener('DOMContentLoaded', () => {
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const addBtn = document.getElementById('addBtn');
    const flashcardsContainer = document.getElementById('flashcards');

    // Carregar flashcards do localStorage
    loadFlashcards();

    addBtn.addEventListener('click', function() {
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();

        if (question && answer) {
            const flashcard = createFlashcardElement(question, answer);
            flashcardsContainer.appendChild(flashcard);
            saveFlashcardToLocalStorage(question, answer);

            // Limpar os inputs
            questionInput.value = '';
            answerInput.value = '';
        } else {
            alert('Por favor, preencha tanto a pergunta quanto a resposta!');
        }
    });

    function createFlashcardElement(question, answer) {
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard';
        flashcard.innerHTML = `
            <strong>Pergunta:</strong> ${question} <br>
            <strong>Resposta:</strong> ${answer}
            <button class="removeBtn">Remover</button>
        `;

        // Adicionar evento de remoção
        flashcard.querySelector('.removeBtn').addEventListener('click', () => {
            flashcardsContainer.removeChild(flashcard);
            removeFlashcardFromLocalStorage(question, answer);
        });

        return flashcard;
    }

    function saveFlashcardToLocalStorage(question, answer) {
        const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.push({ question, answer });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    function loadFlashcards() {
        const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.forEach(({ question, answer }) => {
            const flashcard = createFlashcardElement(question, answer);
            flashcardsContainer.appendChild(flashcard);
        });
    }

    function removeFlashcardFromLocalStorage(question, answer) {
        const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        const updatedFlashcards = flashcards.filter(card => card.question !== question || card.answer !== answer);
        localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    }
});

