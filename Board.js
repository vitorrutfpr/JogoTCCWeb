// Board.js
import { Celula } from './Celula.js';

export class Board {
    constructor(jogadores) {
        this.jogadores = jogadores;
        this.celulas = [];
    }

    createBoard() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = ''; 

        this.celulas = [];

        for (let i = 0; i < 40; i++) {
            this.celulas.push(new Celula(i)); 
        }

        this.jogadores.forEach((jogador) => {
            this.celulas[jogador.posicao].adicionarJogador(jogador);
        });

        this.celulas.forEach(celula => {
            boardElement.appendChild(celula.criarElemento());
        });
    }
}
