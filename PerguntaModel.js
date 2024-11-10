export class PerguntaModel {
    constructor(id, ano, banca, orgao, prova, pergunta, alternativas, alternativaCorreta) {
        this.id = id || "Valor não informado"; 
        this.ano = ano || "Ano não especificado";
        this.banca = banca || "Banca não especificada";
        this.orgao = orgao || "Órgão não especificado";
        this.prova = prova || "Prova não especificada";
        this.pergunta = pergunta || "Pergunta não informada";
        this.alternativas = alternativas || []; 
        this.alternativaCorreta = alternativaCorreta || "Alternativa não especificada";
        this.solucao = solucao || "Solução não informada";
    }

    toString() {
        return `Pergunta ID ${this.id}: ${this.pergunta}`;
    }
}
