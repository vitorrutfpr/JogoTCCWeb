
export class Jogador {
    
    constructor(index, imagem) {
        this.index = index;
        this.imagem = imagem;    
        this.posicao = 36 + index; 
        this.opcoesDeMovimento = [1, 2, 3]; 
        this.movimentosRealizados = [];
    }

    escolherMovimento(opcao) {
        if (this.movimentosRealizados.includes(opcao)) {
            alert("Você já escolheu essa opção de movimento. Escolha outra.");
            return false;
        }
        this.movimentosRealizados.push(opcao);

        if (this.movimentosRealizados.length === this.opcoesDeMovimento.length) {
            this.resetarOpcoes();
        }

        return true;
    }

    resetarOpcoes() {
        this.movimentosRealizados = [];
        this.opcoesDeMovimento = [1, 2, 3];
    }

    moverJogador(opcao) {
        opcao = opcao * 4
        if (this.posicao - opcao >= 0) {
            this.posicao -= opcao;
        } else {
            this.posicao = 0;
        }
    }
}