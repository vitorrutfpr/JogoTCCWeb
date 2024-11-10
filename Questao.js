export class Questao {
    constructor() {
        this.perguntas = [];
    }

    async carregarPerguntas() {
        const totalPerguntas = 37; 
        const promessas = [];

        for (let i = 1; i <= totalPerguntas; i++) {
            const arquivoJson = `./perguntas/${i}.json`;
            promessas.push(fetch(arquivoJson).then(response => response.json()));
        }

        const perguntasCarregadas = await Promise.all(promessas);
        perguntasCarregadas.forEach(pergunta => {
            this.perguntas.push(pergunta);
        });
    }

    async displayQuestion() {
        if (this.perguntas.length === 0) return;

        const pergunta = this.perguntas[Math.floor(Math.random() * this.perguntas.length)];

        const questionContainer = document.getElementById('question-container');
        const alternativesContainer = document.getElementById('alternatives');
        
        questionContainer.innerHTML = pergunta.pergunta;
        
        alternativesContainer.innerHTML = '';
        pergunta.alternativas.forEach(item => {
            const button = document.createElement('button');
            button.textContent = `${item.alternativa} - ${item.solucao}`;
            button.classList.add('alternativa');
            alternativesContainer.appendChild(button);
        });

        questionContainer.style.display = 'block';
    }

    handleAnswer(respostaEscolhida) {
        const pergunta = this.perguntas.find(q => q.pergunta === document.getElementById('question-container').textContent);
        return pergunta.alternativaCorreta === respostaEscolhida; 
    }
}
