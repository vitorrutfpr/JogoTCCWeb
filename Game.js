import { Jogador } from './Jogador.js';
import { Board } from './Board.js';
import { Questao } from './Questao.js';

export class Game {
    constructor() {
        this.jogadores = [
            new Jogador(0, "imagens/cavalo.png"),
            new Jogador(1, "imagens/torre.png"),
            new Jogador(2, "imagens/bispo.png"),
            new Jogador(3, "imagens/rainha.png")
        ];

        this.questao = new Questao();
        this.board = new Board(this.jogadores);
        this.currentPlayerIndex = 0;

        this.initGame();
    }

    async initGame() {
        this.board.createBoard();
        this.questao.carregarPerguntas();
        document.getElementById("current-player-img").src = this.jogadores[this.currentPlayerIndex].imagem;
        this.setupMoveOptionButtons();
    }

    setupMoveOptionButtons() {
        document.querySelectorAll('.move-option').forEach(button => {
            button.addEventListener('click', (event) => this.handleMoveChoice(event));
        });
    }

    updatePlayerPosition() {
        this.board.createBoard();
    }

    async displayQuestion() {
        const pergunta = this.questao.perguntas[Math.floor(Math.random() * this.questao.perguntas.length)];
        
        const questionContainer = document.getElementById('question-container');
        const alternativesContainer = document.getElementById('alternatives');
        
        questionContainer.innerHTML = pergunta.pergunta;
        
        alternativesContainer.innerHTML = '';
        pergunta.alternativas.forEach(alternativa => {
            const button = document.createElement('button');
            button.textContent = `${alternativa.alternativa}: ${alternativa.solucao}`;
            button.classList.add('alternativa');
            button.dataset.alternativa = alternativa.alternativa;
            alternativesContainer.appendChild(button);
    
            button.addEventListener('click', () => {
                const alternativaEscolhida = alternativa.alternativa;
                const alternativaCorreta = pergunta.alternativaCorreta;
                
                if (alternativaEscolhida === alternativaCorreta) {
                    this.processAnswer(true);
                    button.style.backgroundColor = 'green'; 
                } else {
                    this.processAnswer(false);
                    button.style.backgroundColor = 'red'; 
                }
                
                document.querySelectorAll('#alternatives button').forEach(btn => {
                    btn.disabled = true;
                });
    
                setTimeout(() => {
                    alternativesContainer.innerHTML = '';
                }, 2000);
            });
        });
        questionContainer.style.display = 'block';
    }
    
    processAnswer(isCorrect) {
        const currentPlayer = this.jogadores[this.currentPlayerIndex];
        const moveOption = parseInt(localStorage.getItem('moveOption'), 10);
        
    
        const playerIcon = document.createElement('img');
        playerIcon.src = currentPlayer.imagem;
        playerIcon.alt = `Ícone do jogador ${currentPlayer.nome}`;
        playerIcon.style.width = '30px'; 
        playerIcon.style.marginRight = '10px'; 
    
     
        if (isCorrect) {
            currentPlayer.moverJogador(moveOption);
            this.updatePlayerPosition();
        } 

    
        document.getElementById('question-container').style.display = 'none';
    
        setTimeout(() => {
            this.switchPlayer();
        }, 2000); 
    }
    
    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.jogadores.length;
        document.getElementById("current-player-img").src = this.jogadores[this.currentPlayerIndex].imagem;
        this.displayMoveOptions();
    }

    handleMoveChoice(event) {
        const moveOption = parseInt(event.target.dataset.move);
        if (!this.jogadores[this.currentPlayerIndex].escolherMovimento(moveOption)) {
            return;
        }

        localStorage.setItem('moveOption', moveOption);
        document.querySelectorAll('.move-option').forEach(button => {
            button.style.display = 'none';
        });

        this.displayQuestion();
    }


    displayMoveOptions() {
        document.querySelectorAll('.move-option').forEach(button => {
            button.style.display = 'inline-block';
        });
    }
}

const game = new Game();
