//Objetivo desta classe é gerenciar todos os elementos da parte visual do jogo.

export class GerenciadorDOM {
    constructor() {
        this.elementoTabuleiro = document.getElementById("board");
        this.elementoQuestao = document.getElementById("question-container");
        this.elementoAlternativas = document.getElementById("alternativas");
        this.elementoImagemDoJogador = document.getElementById("current-player-img");
        this.elementoOpcoesDeMovimento = document.querySelectorAll('.move-option');
    }

    renderizarTabuleiro(celulas) {
        this.elementoTabuleiro.innerHTML = '';
        celulas.forEach(celula => {
            this.elementoTabuleiro.appendChild(celula.criarElemento());
        });
    }

    exibirTelaVencedor(jogador, reiniciarCallback) {
        const telaVencedor = document.createElement('div');
        telaVencedor.id = 'winner-screen';
        telaVencedor.innerHTML = `
            <div class="winner-message">
                <h1>🎉 ${jogador.nome || 'Jogador'} venceu! 🎉</h1>
                <button id="restart-game">Jogar Novamente</button>
            </div>
        `;
        document.body.appendChild(telaVencedor);

        const botaoRestart = document.getElementById('restart-game');
        botaoRestart.addEventListener('click', () => {
            document.body.removeChild(telaVencedor);
            if (reiniciarCallback) reiniciarCallback();
        });
    }

    setJogadorNoTurnoImagem(imagem) {
        this.elementoImagemDoJogador.src = imagem;
    }

    toggleOpcoesDeMovimento(mostrar) {
        this.elementoOpcoesDeMovimento.forEach(button => {
            button.style.display = mostrar ? 'inline-block' : 'none';
        });
    }

    mostrarQuestao(pergunta) {
        this.elementoQuestao.innerHTML = pergunta.pergunta;
        this.elementoAlternativas.innerHTML = '';

        pergunta.alternativas.forEach(alternativa => {
            const button = document.createElement('button');
            button.textContent = `${alternativa.alternativa}: ${alternativa.solucao}`;
            button.classList.add('alternativa');
            button.dataset.alternativa = alternativa.alternativa;
            this.elementoAlternativas.appendChild(button);
        });

        this.elementoQuestao.style.display = 'block';
    }

    limparAlternativas() {
        this.elementoAlternativas.innerHTML = '';
    }

    desabilitarAlternativas() {
        this.elementoAlternativas.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });
    }

    setListenerBotoesDeMovimento(callback) {
        this.elementoOpcoesDeMovimento.forEach(button => {
            button.addEventListener('click', callback);
        });
    }

    setListenerBotoesDeAlternativas(callback) {
        this.elementoAlternativas.querySelectorAll('.alternativa').forEach(button => {
            button.addEventListener('click', () => callback(button));
        });
    }

    esconderQuestoes() {
        this.elementoQuestao.style.display = 'none';
    }
}
