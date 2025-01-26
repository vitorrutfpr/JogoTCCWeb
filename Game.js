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

        this.questoes = new Questao();
        this.perguntaAtualId = null;
        this.board = new Board(this.jogadores);
        this.gerenciadorDOM = new GerenciadorDOM(this);
        this.jogadorNoTurno = this.jogadores[0];
        this.idPerguntasJaFeitas = [];
        this.gerenciadorDOM.toggleOpcoesDeMovimento(false);

        this.iniciarJogo();
    }

    async iniciarJogo() {
        await this.questoes.carregarPerguntas(QUANTIDADE_TOTAL_PERGUNTAS);
        this.board.renderizarTabuleiro();
        this.gerenciadorDOM.setJogadorNoTurnoImagem(this.jogadorNoTurno.imagem);
        this.gerenciadorDOM.setListenerBotoesDeMovimento(this.handleOpcaoDeMovimentoEscolhida.bind(this));
        await this.iniciarTurno();
    }

    inicializarJogadores() {
        this.jogadores = [
            new Jogador(0, "imagens/cavalo.png"),
            new Jogador(1, "imagens/torre.png"),
            new Jogador(2, "imagens/bispo.png"),
            new Jogador(3, "imagens/rainha.png")
        ];
    }

    reiniciarJogo() {
        console.log('Reiniciando o jogo...');
        this.inicializarJogadores();
        this.jogadorNoTurno = this.jogadores[0];
        this.board = new Board(this.jogadores);
        this.idPerguntasJaFeitas = [];
        this.questoes = new Questao();
        this.perguntaAtualId = null;
        this.gerenciadorDOM.resetarInterface(); 
        this.gerenciadorDOM.toggleOpcoesDeMovimento(false);
        this.iniciarJogo();
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
        const perguntasNaoFeitas = this.questoes.perguntas.filter(
            pergunta => !this.idPerguntasJaFeitas.includes(pergunta.id)
        );
    
        let pergunta;
    
        if (perguntasNaoFeitas.length > 0) {
            pergunta = perguntasNaoFeitas[Math.floor(Math.random() * perguntasNaoFeitas.length)];
        } else {
            //se todas as perguntas já foram feitas, reinicia questoes
            this.idPerguntasJaFeitas = [];
            pergunta = this.questoes.perguntas[Math.floor(Math.random() * this.questoes.perguntas.length)];
        }
    
        this.perguntaAtualId = pergunta.id;
        this.idPerguntasJaFeitas.push(this.perguntaAtualId);
    
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
            this.gerenciadorDOM.exibirTelaVencedor(this.jogadorNoTurno, this.reiniciarJogo.bind(this));
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
        const estaCorreta = this.questoes.respostaEstaCorreta(this.jogadorNoTurno.alternativaEscolhida);
        this.processarResposta(estaCorreta);
        if (estaCorreta) {
            button.style.backgroundColor = 'green';
        } else {
            button.style.backgroundColor = 'red';
            const alternativaCorreta = this.questoes.perguntas.find(p => p.id === this.perguntaAtualId).alternativaCorreta;
            const botoesAlternativas = this.gerenciadorDOM.elementoAlternativas.querySelectorAll('button');
            botoesAlternativas.forEach(btn => {
                if (btn.dataset.alternativa === alternativaCorreta) {
                    btn.style.backgroundColor = 'green';
                }
            });
        }
        this.jogadorNoTurno.opcaoDeMovimentoEscolhida = 0;
    }
}

const game = new Game();
