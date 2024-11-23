
export class Jogador {
    
    constructor(index, imagem) {
        this.index = index;
        this.imagem = imagem;    
        this.posicao = 36 + index; //posicao no tabuleiro
        this.opcaoDeMovimentoEscolhida = 0;
        this.opcoesDeMovimento = [1, 2, 3]; 
        this.movimentosRealizados = [];
    }

    handleMovimentosJaEscolhidos() {
        if (this.movimentosRealizados.includes(this.opcaoDeMovimentoEscolhida)) {
            alert("Você já escolheu essa opção de movimento. Escolha outra.");
            return true;
        }

        this.movimentosRealizados.push(this.opcaoDeMovimentoEscolhida);

        if (this.movimentosRealizados.length === this.opcoesDeMovimento.length) {
            this.resetarOpcoes();
        }

        return false;
    }

    resetarOpcoes() {
        this.movimentosRealizados = [];
        this.opcoesDeMovimento = [1, 2, 3];
    }

    moverJogador() {
        this.opcaoDeMovimentoEscolhida = this.opcaoDeMovimentoEscolhida * 4
        if (this.posicao - this.opcaoDeMovimentoEscolhida >= 0) {
            this.posicao -= this.opcaoDeMovimentoEscolhida;
        } else {
            this.posicao = 0;
        }
    }
}