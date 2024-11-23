export class Board {

    Celula = class {
        constructor(index) {
            this.index = index; 
            this.jogador = null;
        }

        adicionarJogador(jogador) {
            this.jogador = jogador;
        }

        removerJogador() {
            this.jogador = null;
        }

        criarElemento() {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (this.jogador !== null) {
                const img = document.createElement("img");
                img.src = this.jogador.imagem;  
                img.classList.add("piece");   
                img.dataset.column = this.jogador.index;
                cell.appendChild(img);          
            }

            return cell;
        }
    }

    constructor(jogadores) {
        this.jogadores = jogadores;
        this.celulas = []; 
    }

    renderizarTabuleiro() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = ''; 

        this.celulas = [];

        for (let i = 0; i < 40; i++) {
            this.celulas.push(new this.Celula(i)); 
        }
        this.jogadores.forEach((jogador) => {
            this.celulas[jogador.posicao].adicionarJogador(jogador); 
        });

        this.celulas.forEach(celula => {
            boardElement.appendChild(celula.criarElemento());
        });
    }

}
