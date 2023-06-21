let Receptor = prompt("Qual seu nome?", "Seu Nome");

if (confirm("Bom dia " + Receptor + " !!!!!")) {
  alert("continuando");
}

const numero_moedas = 30;
const tempo_inicial = 5;
let pontos = 0;
let tempo = 0;
let timer = null;

let pontuacao = {
  pontuacao: pontos,
  nome: Receptor
};

fetch('http://localhost:5050/score', {
  method: "POST",
  body: JSON.stringify(pontuacao),
  headers: { "Content-type": "application/json; charset=UTF-8" }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));

function iniciaJogo(){
  pontos = 0;
  tempo = tempo_inicial;
  let tela = document.getElementById("tela");
  tela.innerHTML = "";

  for (let i = 0; i < numero_moedas; ++i) {
    let moeda = document.createElement("img");
    moeda.src = "acesa.png";
    moeda.id = "j" + i;
    moeda.onclick = function () {
      pegaMoeda(this);
    };
    tela.appendChild(moeda);
  }
  timer = setInterval(contaTempo, 1000);


  criarElemento(jogado, pontua){
    for (let i = 0; i < 10; ++i) {
    let pe = document.createElement("h4");
    pe.class = "j" ;
    pe.textContent = jogado + ' tem: ' + pontua;
    let tudo = document.getElementById("tudo");
    tudo.appendChild(pe);
  }}

  fetch('http://localhost:5050/score')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const jogadores = data;
      jogadores.forEach(jogador => {
        criarElemento(jogador.name, jogador.pontuacao);
      });
    })
    .catch(error => {
      console.error(error);
    });

  
  

}




function pegaMoeda(moeda) {
  moeda.src = "apagada.png";
  ++pontos;
  let contadorPontos = document.getElementById("pontos");
  contadorPontos.innerText = pontos;
}

function contaTempo() {
  if (tempo > 0) {
    --tempo;
    let contadorTempo = document.getElementById("tempo");
    contadorTempo.innerText = tempo;
  }

  if (tempo <= 0) {
    clearInterval(timer);
    alert("Você fez " + pontos + " pontos, parabéns!");
    iniciaJogo();
  }
}