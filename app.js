
let numeroMaximo = 10;
textoInicial();
let listaDeNumeroSecreto = [];
tentativa = 1;
let numeroSorteado = gerarNumeroSecreto();

// FUNÇÕES

function textoDaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
};

function textoInicial(){
    textoDaTela('h1','Jogo Do Número Secreto');
    textoDaTela('p', `Escolha um número de 1 a ${numeroMaximo}`);
};

function gerarNumeroSecreto(){
    let numeroSecreto = parseInt(Math.random()*numeroMaximo)+1;
    if(listaDeNumeroSecreto.length == numeroMaximo){
        listaDeNumeroSecreto = [];
    };
    if(listaDeNumeroSecreto.includes(numeroSecreto)){
        return gerarNumeroSecreto();
    }else{
        listaDeNumeroSecreto.push(numeroSecreto);
        limparInput();
        return numeroSecreto;
    };
};

function verificarChute(){
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
    if(chute == numeroSorteado){
        textoDaTela('h1','Venceu!');
        textoDaTela('p', `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
        if(listaDeNumeroSecreto.length == numeroMaximo){
            document.getElementById('restart').removeAttribute('disabled');
            document.getElementById('reiniciar').setAttribute('disabled', true);
            document.getElementById('chutar').setAttribute('disabled', true);
            textoDaTela('h1', 'Parabéns.');
            textoDaTela('p', 'Você zerou o jogo do número secreto');
            };
    }else{
        if(chute > numeroSorteado){
            textoDaTela('p', `${chute} é maior que o número secreto.`);
        }else{
            textoDaTela('p', `${chute} é menor que o número secreto.`);
        };
        tentativa++;
        limparInput();
    }; 
};

function limparInput(){
    let input = document.querySelector('input');
    input.value = "";
};

function reiniciarJogo(){
    limparInput();
    textoInicial();
    tentativa = 1;
    numeroSorteado = gerarNumeroSecreto();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
};

function restartJogo(){
    document.getElementById('restart').setAttribute('disabled', true);
    listaDeNumeroSecreto = [];
    limparInput();
    reiniciarJogo();
};
