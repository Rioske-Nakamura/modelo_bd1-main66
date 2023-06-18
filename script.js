

let Receptor = prompt("Qual seu nome?", "Seu Nome");

    

 if (confirm("Bom dia " + Receptor + " !!!!!")) {
      alert("continuando")
    }




const numero_moedas = 30;
const tempo_inicial = 5;
let pontos = 0;
let tempo = 0;
let timer = null;

function iniciaJogo() {
  pontos = 0;
  tempo = tempo_inicial;
  let tela = document.getElementById("tela");
  tela.innerHTML = "";

  for (let i = 0; i < numero_moedas; ++i) {
    let moeda = document.createElement("img");
    moeda.src = "acesa.png";
    moeda.id = "j" + i;
    moeda.onclick = function() {
      pegaMoeda(this);
    }
    tela.appendChild(moeda);
  }
  timer = setInterval(contaTempo, 1000);


  function criarElemento(pokemon, link){
    const container = document.getElementById('tudo');
    const name = document.createElement('p');
    const url = document.createElement('p');
  
    name.textContent = pokemon;
    url.textContent = link;
  
    container.appendChild(name);
    container.appendChild(url);
  }
  
  fetch('http://localhost:5050/score')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição'); 
      }
      return response.json();
    })
    .then(data => {
      const pokemonList = data
      pokemonList.forEach(pontuacao => {
        criarElemento(pontuacao.name, pontuacao.pontos)
      });
    })
    .catch(error => {
      console.log(error);
    });

    let pontuacao = {
      name: Receptor,
      pontos: pontos  }
  
    fetch('http://localhost:5050/score', {
      method: "POST",
      body: JSON.stringify(pontuacao),
      headers: {"Content-type":"application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error))

}




















function pegaMoeda(moeda) {
  moeda
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

    return contaTempo = null;
  }

  if (tempo <= 0) {
    clearInterval(timer);
    alert("você fez " + pontos + " pontos, parabéns!");
    iniciaJogo();
  }
}