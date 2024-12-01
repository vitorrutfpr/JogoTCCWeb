
export class Jogador {
    
    constructor(index, imagem) {
        this.index = index;
        this.imagem = imagem;    
        this.posicao = 36 + index; //posicao no tabuleiro
        this.opcaoDeMovimentoEscolhida = 0;
        this.opcoesDeMovimento = [1, 2, 3]; 
        this.movimentosRealizados = [];
        this.alternativaEscolhida = false; 
    }

    handleMovimentosJaEscolhidos() {
        this.movimentosRealizados.push(this.opcaoDeMovimentoEscolhida);
        if (this.movimentosRealizados.length === this.opcoesDeMovimento.length) {
            this.resetarOpcoesDeMovimento();
        }
        return false;
    }

    resetarOpcoesDeMovimento() {
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