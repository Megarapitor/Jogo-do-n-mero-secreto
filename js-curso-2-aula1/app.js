let numerosUsados = [];
let numeroMaximo = 10;
let chutesPartida = [];
let numeroSecreto = getRandomInt(1, numeroMaximo);
console.log(numeroSecreto);
let tentativas = 0;
function editaTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    synth.speak(utterance);
    utterance.rate = 1.4;
}
function mensagemInicial() {
    editaTexto("h1", "Jogo do número secreto");
    editaTexto("p", `Escolha um número de 1 a ${numeroMaximo}`);
}
mensagemInicial()
function getRandomInt(min, max) {
    let numeroGerado = Math.floor(Math.random() * (max - min + 1) + min);
    let quantidade = numerosUsados.length;
    console.log(numerosUsados);
    if (quantidade == numeroMaximo) {
        numerosUsados = [];
    }

    if (numerosUsados.includes(numeroGerado)) {
        return getRandomInt(min, max);
    } else {
        numerosUsados.push(numeroGerado);
        return numeroGerado;
    }
}

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    let comparacao = numeroSecreto > chute ? "maior" : "menor";
    let fimDaLista = chutesPartida.length - 1;
    let inicioDalista = 0;
    let comparacaoChutePartida = numeroSecreto > chutesPartida[0] ? "maior" : "menor";
    let flexão
    if (isNaN(chute) || chute <= 0 || chute > numeroMaximo) {
        editaTexto("p", `Valor inválido, se atente a valores presentes na escala (1 a ${numeroMaximo})`);
    } else {
        if (chutesPartida.includes(chute)) {
            if (chutesPartida.length == 1) {
                editaTexto("p", `Ops, você já tentou este número, vamos tentar outro ? Dica: Sabemos que o número secreto é ${comparacaoChutePartida} que ${chutesPartida[inicioDaLista]}`);
            } else {
                while (chutesPartida[fimDaLista] > numeroSecreto || chutesPartida[inicioDaLista] < numeroSecreto) {
                    if (chutesPartida[fimDaLista] > numeroSecreto) {
                        fimDaLista--;
                    }

                    if (chutesPartida[inicioDaLista] < numeroSecreto) {
                        inicioDaLista++;
                    }
                }
                fimDaLista += 1;
                inicioDaLista -= 1;
                if (numeroSecreto > chutesPartida[chutesPartida.length - 1]) {
                    editaTexto("p", `Ops, você já tentou este número, vamos tentar outro ? Dica: Sabemos que o número secreto é maior que ${chutesPartida[chutesPartida.length - 1]} `);
                } else {
                    if (numeroSecreto < chutesPartida[0]) {
                        editaTexto("p", `Ops, você já tentou este número, vamos tentar outro ? Dica: Sabemos que o número secreto é menor que ${chutesPartida[0]}`);
                    } else {
                        editaTexto("p", `Ops, você já tentou este número, vamos tentar outro ? Dica: Sabemos que o número secreto está entre ${chutesPartida[inicioDaLista]} e ${chutesPartida[fimDaLista]}`);
                    }
                }
            }
        } else {
            chutesPartida.push(chute);
            chutesPartida.sort(function (a, b) { return a - b });
            tentativas++;
            flexão = tentativas == 1 ? "tentativa" : "tentativas";
            if (chute == numeroSecreto) {
                editaTexto("h1", "Acertou!!");
                editaTexto("p", `Você precisou de: ${tentativas} ${flexão}. Vamos jogar mais uma ?`);
                document.getElementById("reiniciar").removeAttribute("disabled");
                document.getElementById("chutar").setAttribute("disabled", true);
            } else {
                editaTexto("p", `Errado, mas não desista! Dica: Tente um número ${comparacao}.`);
            }
        }
    }
    limparCampo();
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = getRandomInt(1, numeroMaximo);
    limparCampo();
    mensagemInicial();
    chutesPartida = [];
    tentativas = 0;
    console.log(numeroSecreto);
    document.getElementById("reiniciar").setAttribute("disabled", true);
    document.getElementById("chutar").removeAttribute("disabled");
}
