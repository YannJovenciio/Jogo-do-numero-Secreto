//let titulo = document.querySelector('h1');
//titulo.innerHTML = "Jogo do numero secreto";

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = `Escolha um numero entre 1 e ${numeroMaximo}`
//Observe antes e depois, definimos os parametros e agora fazemos de maneira automatizada
let listaDeNumerosSorteados = [];

let numeroMaximo= 100;
let tentativas = 1;



 
let Secretnumber = gerarNumeroAleatorio();

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function exibirMensagenInicial() {
    exibirTextoNaTela('h1','Jogo do numero secreto');
    exibirTextoNaTela('p',`Escolha um numero entre 1 e ${numeroMaximo}`);
    
}


exibirTextoNaTela('h1','Jogo do numero secreto');
exibirTextoNaTela('p',`Escolha um numero entre 1 e ${numeroMaximo}`);

function verificarChute() {
    let chute = document.querySelector('input').value;

   if (chute == Secretnumber){
    exibirTextoNaTela('h1','Acertou!!!!');

    let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
    let mensagemTentativas= `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa};`
    exibirTextoNaTela('p',`${mensagemTentativas}`);
    document.getElementById('reiniciar').removeAttribute('disabled');

    
   } else {
        if (chute > Secretnumber){
            exibirTextoNaTela('p',`o numero secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p',`o numero secreto é maior que ${chute}`);
        }
        //tentativa=tentativa +1
        tentativas++;
        limparCampo();

   }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* 100 +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 3) {
        listaDeNumerosSorteados=[]
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido
    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    Secretnumber = gerarNumeroAleatorio;
    limparCampo();
    tentativas = 1;
    exibirMensagenInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true)
    
}


