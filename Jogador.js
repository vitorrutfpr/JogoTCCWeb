const TOTAL_DE_MOVIMENTOS_POSSIVEIS_PELO_JOGADOR = 3;

export class Jogador {
    
    constructor(index, imagem) {
        this.index = index;
        this.imagem = imagem;    
        this.posicao = 36 + index; //posicao no tabuleiro
        this.opcaoDeMovimentoEscolhida = 0;
        this.movimentosRealizados = [];
        this.alternativaEscolhida = false; 
    }

    adicionarNaListaDeMovimentosJaEscolhidos() {
        this.movimentosRealizados.push(this.opcaoDeMovimentoEscolhida);
        if (this.movimentosRealizados.length === TOTAL_DE_MOVIMENTOS_POSSIVEIS_PELO_JOGADOR) {
            this.resetarOpcoesDeMovimento();
        }
        return false;
    }

    resetarOpcoesDeMovimento() {
        this.movimentosRealizados = [];
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