

export class Celula {
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
