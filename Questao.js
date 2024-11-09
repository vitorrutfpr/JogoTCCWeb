export class Questao {
    constructor() {
        this.questionsList = [
            {
                pergunta: "Qual é a capital da França?",
                alternativas: [
                    { alternativa: "Londres", correta: false },
                    { alternativa: "Paris", correta: true },
                    { alternativa: "Roma", correta: false },
                    { alternativa: "Berlim", correta: false }
                ]
            },
            {
                pergunta: "Qual é a capital da Itália?",
                alternativas: [
                    { alternativa: "Madri", correta: false },
                    { alternativa: "Lisboa", correta: false },
                    { alternativa: "Roma", correta: true },
                    { alternativa: "Berlim", correta: false }
                ]
            },
            {
                pergunta: "Qual é a capital da Alemanha?",
                alternativas: [
                    { alternativa: "Londres", correta: false },
                    { alternativa: "Paris", correta: false },
                    { alternativa: "Roma", correta: false },
                    { alternativa: "Berlim", correta: true }
                ]
            }
        ];
        this.currentQuestion = null;
    }

    selectRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * this.questionsList.length);
        this.currentQuestion = this.questionsList[randomIndex];
    }

    displayQuestion() {
        this.selectRandomQuestion();

        const questionContainer = document.getElementById('question-container');
        const questionText = document.getElementById('question');
        const alternativesContainer = document.getElementById('alternatives');

        alternativesContainer.innerHTML = '';
        questionText.textContent = this.currentQuestion.pergunta;

        this.currentQuestion.alternativas.forEach((text) => {
            const button = document.createElement('button');
            button.textContent = text.alternativa;
            button.addEventListener('click', () => this.handleAnswer(text.alternativa));
            alternativesContainer.appendChild(button);
        });

        questionContainer.style.display = 'block';
    }

    handleAnswer(selectedAnswer) {
        const resultContainer = document.getElementById('result');
        const moveOption = parseInt(localStorage.getItem('moveOption'), 10);
        const respostaCorreta = this.currentQuestion.alternativas.find(alt => alt.alternativa === selectedAnswer).correta;

        resultContainer.textContent = respostaCorreta
            ? `Resposta correta! Você avançou ${moveOption} casas.`
            : `Resposta incorreta! Você não avançou nenhuma casa.`;

        resultContainer.style.display = 'block';

        return respostaCorreta;
    }
}
