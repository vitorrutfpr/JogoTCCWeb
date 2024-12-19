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
        this.gerenciadorDOM = new GerenciadorDOM(this);
        this.jogadorNoTurno = this.jogadores[0];
        
        this.gerenciadorDOM.toggleOpcoesDeMovimento(false);

        this.iniciarJogo();
    }

    async iniciarJogo() {
        await this.questao.carregarPerguntas(QUANTIDADE_TOTAL_PERGUNTAS);
        this.board.renderizarTabuleiro();
        this.gerenciadorDOM.setJogadorNoTurnoImagem(this.jogadorNoTurno.imagem);
        this.gerenciadorDOM.setListenerBotoesDeMovimento(this.handleOpcaoDeMovimentoEscolhida.bind(this));
        await this.iniciarTurno();
    }
    
    async iniciarTurno() {
        const botaoClicado = await this.gerenciadorDOM.mostrarBotaoDeIniciarTurno();
        
        if (botaoClicado) {
            this.gerenciadorDOM.toggleOpcoesDeMovimento(true); 
            this.mostrarQuestao(); 
            this.gerenciadorDOM.atualizarOpcoesDeMovimento();
            
        }
    }

    mostrarQuestao() {
        const pergunta = this.questao.perguntas[Math.floor(Math.random() * this.questao.perguntas.length)];
        this.gerenciadorDOM.renderizarQuestao(pergunta);
        this.gerenciadorDOM.setListenerBotoesDeAlternativas(this.handleAlternativaEscolhida.bind(this));
        this.gerenciadorDOM.desabilitarAlternativas(); 
        this.gerenciadorDOM.setListenerDoOverlayDeAlternativas();

    }

    processarResposta(estaCorreta) {
        if (estaCorreta) {
            this.jogadorNoTurno.moverJogador();
            this.board.renderizarTabuleiro();
        }

        if (this.jogadorVenceu()){
            this.gerenciadorDOM.exibirTelaVencedor(this.jogadorNoTurno);
            //this.reiniciarJogo();
        } else {
            setTimeout(() => {
                this.proximoTurno();
            }, 2000);
        }
    }

    jogadorVenceu(){
        if (this.jogadorNoTurno.posicao <= this.jogadorNoTurno.index) {
            return true;
        }
        else {
            return false;
        }
    }

    proximoTurno() {
        this.trocarJogadorNaVez();
        this.gerenciadorDOM.esconderQuestoes();
        this.gerenciadorDOM.limparAlternativas();
        this.gerenciadorDOM.toggleOpcoesDeMovimento(false);
        this.gerenciadorDOM.desmarcarOpcaoDeMovimentoSelecionado();
        this.gerenciadorDOM.desabilitarAlternativas();

        this.iniciarTurno();
    }

    trocarJogadorNaVez() {
        this.jogadorNoTurno = this.jogadores[(this.jogadorNoTurno.index + 1) % this.jogadores.length];
        this.gerenciadorDOM.setJogadorNoTurnoImagem(this.jogadorNoTurno.imagem);
    }

    handleOpcaoDeMovimentoEscolhida(event) {
        this.jogadorNoTurno.opcaoDeMovimentoEscolhida = parseInt(event.target.dataset.move);
        console.log(this.jogadorNoTurno.opcaoDeMovimentoEscolhida);
        this.gerenciadorDOM.desmarcarOpcaoDeMovimentoSelecionado();
        this.gerenciadorDOM.marcarOpcaoDeMovimentoSelecionado(event.target);
        this.gerenciadorDOM.habilitarAlternativas();
        
    }
    
    handleAlternativaEscolhida(button) {
        this.jogadorNoTurno.adicionarNaListaDeMovimentosJaEscolhidos();
        this.jogadorNoTurno.alternativaEscolhida = button.dataset.alternativa;
        this.gerenciadorDOM.desabilitarAlternativas();
        this.gerenciadorDOM.toggleOpcoesDeMovimento(false);
        const estaCorreta = this.questao.respostaEstaCorreta(this.jogadorNoTurno.alternativaEscolhida);
        this.processarResposta(estaCorreta);
        button.style.backgroundColor = estaCorreta ? 'green' : 'red';
        this.jogadorNoTurno.opcaoDeMovimentoEscolhida = 0;
    }
}

const game = new Game();
