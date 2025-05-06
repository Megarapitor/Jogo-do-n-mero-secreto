/*
maneira de fazer qe funciona porém não é eficient
let titulo = document.querySelector('h1');  
titulo.innerHTML = 'Jogo do número secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número de 1 a 30'; */
let numerosUsados = []
let numeroMaximo = 30;
let numeroSecreto = getRandomInt(1, numeroMaximo);
console.log(numeroSecreto);
let tentativas = 0;
function editaTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    synth.speak(utterance);
    utterance.rate = 1.4;
}
function mensagemInicial() {
    editaTexto('h1', 'Jogo do número secreto');
    editaTexto('p', `Escolha um número de 1 a ${numeroMaximo}`);
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
    tentativas++;
    let comparacao = numeroSecreto > chute ? "maior" : "menor"
    let flexão = tentativas == 1 ? "tentativa" : "tentativas"

    if (isNaN(chute) || chute <= 0 || chute > numeroMaximo) {
        editaTexto("p", `Valor inválido, se atente a valores presentes na escala (1 a ${numeroMaximo})`);
    } else {
        if (chute == numeroSecreto) {
            editaTexto("h1", "Acertou!!");
            editaTexto("p", `Você precisou de: ${tentativas} ${flexão}. Vamos jogar mais uma ?`);
            document.getElementById("reiniciar").removeAttribute("disabled")
        } else {
            editaTexto("p", `Errado, mas não desista! Dica: Tente um número ${comparacao}.`);
        }
    }
    limparCampo()
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = getRandomInt(1, numeroMaximo)
    limparCampo()
    mensagemInicial()
    tentativas = 0
    console.log(numeroSecreto)
    document.getElementById("reiniciar").setAttribute("disabled", true)
}
