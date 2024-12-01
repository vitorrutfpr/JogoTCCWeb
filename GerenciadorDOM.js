//Objetivo desta classe é gerenciar todos os elementos da parte visual do jogo.

export class GerenciadorDOM {
    constructor(game) {
        this.game = game;
        this.elementoTabuleiro = document.getElementById("board");
        this.elementoQuestao = document.getElementById("question-container");
        this.elementoAlternativas = document.getElementById("alternativas");
        this.elementoImagemDoJogador = document.getElementById("current-player-img");
        this.elementoOpcoesDeMovimento = document.querySelectorAll('.move-option');
        this.botaoIniciar = document.getElementById('botaoIniciar');
    }

    renderizarTabuleiro(celulas) {
        this.elementoTabuleiro.innerHTML = '';
        celulas.forEach(celula => {
            this.elementoTabuleiro.appendChild(celula.criarElemento());
        });
    }

    atualizarOpcoesDeMovimento() {
        this.elementoOpcoesDeMovimento.forEach(button => {
            const movimento = parseInt(button.dataset.move);
            if (this.game.jogadorNoTurno.movimentosRealizados.includes(movimento)) {
                button.style.display = 'none';  
                button.disabled = true;        
            } else {
                button.style.display = 'inline-block';
                button.disabled = false;      
            }
        });
    }

    mostrarBotaoDeIniciarTurno() {
        return new Promise((resolve) => {
            this.botaoIniciar.style.display = 'block';
            this.botaoIniciar.addEventListener('click', () => {
                this.botaoIniciar.style.display = 'none';  
                resolve(true); 
            });
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

    tremerBotoesDeOpcaoDeMovimento() {
        this.elementoOpcoesDeMovimento.forEach(button => {
            button.classList.add('botao-tremor');
            button.addEventListener('animationend', () => {
                button.classList.remove('botao-tremor');
            });
        });
    }

    renderizarQuestao(pergunta) {
        this.elementoQuestao.innerHTML = pergunta.pergunta;
        this.elementoAlternativas.innerHTML = ''; 
    
        pergunta.alternativas.forEach(alternativa => {
            const button = document.createElement('button');
            button.textContent = `${alternativa.alternativa}: ${alternativa.solucao}`;
            button.classList.add('alternativa');
            button.dataset.alternativa = alternativa.alternativa;
    
            const overlay = document.createElement('div');
            overlay.classList.add('overlay'); 
            button.appendChild(overlay);
            this.elementoAlternativas.appendChild(button);
        });
    
        this.elementoQuestao.style.display = 'block';
    }
    
    setListenerDoOverlayDeAlternativas() {
        const overlays = this.elementoAlternativas.querySelectorAll('.overlay');
    
        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                if (this.game.jogadorNoTurno.opcaoDeMovimentoEscolhida === 0){
                    this.tremerBotoesDeOpcaoDeMovimento();
                }
            });
        });
    }

    removerListenerDoOverlayDeAlternativas() {
        const overlays = this.elementoAlternativas.querySelectorAll('.overlay');
        
        overlays.forEach(overlay => {
            const callback = overlay.dataset.callback;
            overlay.removeEventListener('click', callback);
            delete overlay.dataset.callback;
        });
    }
    
    limparAlternativas() {
        this.elementoAlternativas.innerHTML = '';
    }

    
    habilitarAlternativas() {
        this.elementoAlternativas.querySelectorAll('button').forEach(button => {
            button.disabled = false;
        });
    }
    

    desabilitarAlternativas() {
        this.elementoAlternativas.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });
    }

    marcarOpcaoDeMovimentoSelecionado(button) {
        button.classList.add('selecionado');
        button.disabled = true; 
    }
    
    desmarcarOpcaoDeMovimentoSelecionado() {
        document.querySelectorAll('.move-option').forEach(button => {
            button.classList.remove('selecionado');
            button.disabled = false;
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
