let listaDeNumerosSorteados = [];
let limiteDeSorteio = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
};

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Você acertou');
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"; 
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O seu palpite é maior que o número secreto.');
        }else{
            exibirTextoNaTela('p','O seu palpite é menor que o número secreto.');
        };
        tentativas++;
        limparCampo();
    };
};

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * limiteDeSorteio + 1);
    
    let quantidadeDeElementosEscolhidosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosEscolhidosNaLista == limiteDeSorteio){
      listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
      return gerarNumeroAleatorio();
    }else{
      listaDeNumerosSorteados.push(numeroEscolhido);
      return numeroEscolhido;
    };
};

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
};

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
};