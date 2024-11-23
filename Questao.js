export class Questao {
    constructor() {
        this.perguntas = [];
    }

    async carregarPerguntas(totalPerguntas) {
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

    respostaEstaCorreta(respostaEscolhida) {
        const pergunta = this.perguntas.find(q => q.pergunta === document.getElementById('question-container').textContent);
        return pergunta.alternativaCorreta === respostaEscolhida; 
    }
}
