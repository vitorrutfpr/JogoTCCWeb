import { Jogador } from './Jogador.js';
import { Board } from './Board.js';
import { Questao } from './Questao.js';
import { GerenciadorDOM } from './GerenciadorDOM.js';

const QUANTIDADE_TOTAL_PERGUNTAS = 37;


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
        this.gerenciadorDOM = new GerenciadorDOM();
        this.jogadorNoTurno = this.jogadores[0];

        this.iniciarJogo();
    }

    async iniciarJogo() {
        this.board.renderizarTabuleiro();
        this.questao.carregarPerguntas(QUANTIDADE_TOTAL_PERGUNTAS);
        this.gerenciadorDOM.setJogadorNoTurnoImagem(this.jogadorNoTurno.imagem);
        this.gerenciadorDOM.setListenerBotoesDeMovimento(this.handleOpcaoDeMovimentoEscolhida.bind(this));
    }

    async mostrarQuestao() {
        const pergunta = this.questao.perguntas[Math.floor(Math.random() * this.questao.perguntas.length)];
        this.gerenciadorDOM.mostrarQuestao(pergunta);
        this.gerenciadorDOM.setListenerBotoesDeAlternativas(this.handleAlternativaEscolhida.bind(this));
    }

    processarResposta(estaCorreta) {
        if (estaCorreta) {
            this.jogadorNoTurno.moverJogador();
            this.board.renderizarTabuleiro();
        }
        console.log(this.jogadorNoTurno, this.jogadorNoTurno.index)
        
        if (this.jogadorNoTurno.posicao <= this.jogadorNoTurno.index) {
            this.gerenciadorDOM.exibirTelaVencedor(this.jogadorNoTurno);
            return;
        }

        this.proximoTurno();
    }

    proximoTurno() {
        setTimeout(() => {
            this.trocarJogadorNaVez();
        }, 2000);
    }

    trocarJogadorNaVez() {
        this.jogadorNoTurno = this.jogadores[(this.jogadorNoTurno.index + 1) % this.jogadores.length];
        this.gerenciadorDOM.setJogadorNoTurnoImagem(this.jogadorNoTurno.imagem);
        this.gerenciadorDOM.esconderQuestoes();
        this.mostrarOpcoesDeMovimento();
    }

    handleOpcaoDeMovimentoEscolhida(event) {
        this.jogadorNoTurno.opcaoDeMovimentoEscolhida = parseInt(event.target.dataset.move);
        const movimentoJaEscolhido = this.jogadorNoTurno.handleMovimentosJaEscolhidos(this.jogadorNoTurno.opcaoDeMovimentoEscolhida);

        if (!movimentoJaEscolhido) {
            localStorage.setItem('moveOption', this.jogadorNoTurno.opcaoDeMovimentoEscolhida);
            this.gerenciadorDOM.toggleOpcoesDeMovimento(false);
            this.mostrarQuestao();
        }
    }

    handleAlternativaEscolhida(button) {
        const respostaEscolhida = button.dataset.alternativa;

        if (this.questao.respostaEstaCorreta(respostaEscolhida)) {
            this.processarResposta(true);
            button.style.backgroundColor = 'green';
        } else {
            this.processarResposta(false);
            button.style.backgroundColor = 'red';
        }

        this.gerenciadorDOM.desabilitarAlternativas();
        setTimeout(() => this.gerenciadorDOM.limparAlternativas(), 2000);
    }

    mostrarOpcoesDeMovimento() {
        this.gerenciadorDOM.toggleOpcoesDeMovimento(true);
    }
}

const game = new Game();
