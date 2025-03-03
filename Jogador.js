const TOTAL_DE_MOVIMENTOS_POSSIVEIS_PELO_JOGADOR = 3;
const POSICAO_INICIAL_DO_JOGADOR = 36;
export class Jogador {
    
    constructor(index, imagem) {
        this.index = index;
        this.imagem = imagem;    
        this.posicao = POSICAO_INICIAL_DO_JOGADOR + index; 
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