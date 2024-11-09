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

    initGame() {
        this.board.createBoard();
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

    displayQuestion() {
        this.questao.displayQuestion(); 

        const alternativesContainer = document.getElementById('alternatives');
        alternativesContainer.addEventListener('click', (event) => {
            const selectedAnswer = event.target.textContent;

            const isCorrect = this.questao.handleAnswer(selectedAnswer);
            this.processAnswer(isCorrect); 
        }, { once: true }); //evento sera ouvido 1x só
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

    processAnswer(isCorrect) {
        const moveOption = parseInt(localStorage.getItem('moveOption'), 10);

        if (isCorrect) {
            this.jogadores[this.currentPlayerIndex].moverJogador(moveOption);
            this.updatePlayerPosition();
        }

        document.getElementById('question-container').style.display = 'none';
        this.switchPlayer();
    }

    displayMoveOptions() {
        document.querySelectorAll('.move-option').forEach(button => {
            button.style.display = 'inline-block';
        });
    }
}

const game = new Game();
