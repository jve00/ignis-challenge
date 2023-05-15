const formulario = document.querySelector(".area-de-texto form");
const div = document.querySelector(".area-de-texto");
const ul = document.querySelector(".times ul");
let listaTimes = [];
let jogos = [];
let rodadas = [];
let vencedores = [];

class Time {
  constructor(n, c, v, r, ci) {
    this.nome = n;
    this.cidade = c;
    this.versus = v;
    this.rodada = r;
    this.cidadeDoJogo = ci;
    this.ponto = 0;
  }
}

class Cidade {
  constructor(cidade, qtd) {
    this.cidade = cidade;
    this.qtdd = qtdd;
  }
}

function existe(elementoComparativo, lista) {
  let possui = false;
  lista.forEach((value) => {
    if (value.nome == elementoComparativo.nome) {
      possui = true;
    }
  });
  return possui;
}

function sortear(quantidade) {
  let numero = Math.round(Math.random() * quantidade);
  while (numero > quantidade - 1) {
    numero = Math.round(Math.random() * quantidade);
  }
  return numero;
}

function rodada(rodada) {
  let adicionados = [];
  if (rodada == 2) adicionados = [];
  for (let i = 0; i < listaTimes.length / 2; i++) {
    const tamanho = listaTimes.length;
    let time1 = new Time(
      listaTimes[sortear(tamanho)].nome,
      listaTimes[sortear(tamanho)].cidade,
      null,
      rodada,
      null
    );
    let time2 = new Time(
      listaTimes[sortear(tamanho)].nome,
      listaTimes[sortear(tamanho)].cidade,
      null,
      rodada,
      null
    );
    while (time2.nome == time1.nome) {
      time2 = listaTimes[sortear(tamanho)];
    }
    while (existe(time1, adicionados) || existe(time2, adicionados)) {
      time1 = new Time(
        listaTimes[sortear(tamanho)].nome,
        listaTimes[sortear(tamanho)].cidade,
        null,
        rodada,
        null
      );
      time2 = new Time(
        listaTimes[sortear(tamanho)].nome,
        listaTimes[sortear(tamanho)].cidade,
        null,
        rodada,
        null
      );

      while (time2.nome == time1.nome) {
        time2 = new Time(
          listaTimes[sortear(tamanho)].nome,
          listaTimes[sortear(tamanho)].cidade,
          null,
          rodada,
          null
        );
      }
    }

    const timesJogo = [time1, time2];
    const cidadeDoJogo = timesJogo[sortear(timesJogo.length)].cidade;

    time1.cidadeDoJogo = cidadeDoJogo;
    time2.cidadeDoJogo = cidadeDoJogo;
    if (rodada == 1) {
      time1.rodada = 1;
      time2.rodada = 1;
    } else if (rodada == 2) {
      time1.rodada = 2;
      time2.rodada = 2;
    }

    time2.versus = time1;
    time1.versus = time2;

    jogos.push(time1);
    adicionados.push(time1);
    adicionados.push(time2);

    const li = document.createElement("li");
    li.textContent = `${time1.nome} vs ${time2.nome} - ${cidadeDoJogo} - Rodada ${rodada}`;
    li.classList = cidadeDoJogo;
    li.style.listStyle = "none";
    li.style.margin = "0";
    li.classList += `${cidadeDoJogo}`;
    ul.insertAdjacentHTML("beforeend", li.outerHTML);
  }
  if (jogos[0].rodada == 1) {
    console.log("Rodada 1");
  }
  rodadas.push(jogos);
  jogos = [];
  adicionados = [];
}

function resultado(rodada) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  for (let i = 0; i < rodadas[rodada - 1].length; i++) {
    if (rodadas[rodada - 1][i].versus) {
      const resultado = [
        Math.round(Math.random() * 5),
        Math.round(Math.random() * 5),
      ];
      const time = rodadas[rodada - 1][i];
      li.textContent = `${resultado[0]} - ${resultado[1]} - ${time.nome} vs ${time.versus.nome} - ${time.cidadeDoJogo} - Rodada ${time.rodada}`;

      // console.log(time);
      if (resultado[0] > resultado[1]) {
        time.ponto += 3;
        vencedores.push(time);
      } else if (resultado[0] < resultado[1]) {
        time.versus.ponto += 3;
        vencedores.push(time.versus);
      } else {
        time.ponto += 1;
        time.versus.ponto += 1;
      }
      // console.log(vencedores);
      li.style.listStyle = "none";
      ul.insertAdjacentHTML("beforeend", li.outerHTML);
    }
  }
  document.querySelector(".times").insertAdjacentHTML("afterend", ul.outerHTML);
}

function mostrarCampeao() {
  let empatados = [];
  let listaTimesPontuados = [];
  let campeao = null;
  console.log("Antes");

  // console.log(rodadas);

  rodadas.forEach((value, i) => {
    value.forEach((valor) => {
      rodadas[i].push(valor.versus);
    });
  });

  for (let j = 0; j < rodadas[0].length; j++) {
    rodadas[0][j].ponto += rodadas[1][j].ponto;
    rodadas[0][j].versus = null;
    listaTimesPontuados.push(rodadas[0][j]);
  }

  console.log(listaTimesPontuados);
  // console.log(rodadas);

  for (let i = 0; i < listaTimesPontuados.length - 1; i++) {
    if (listaTimesPontuados[i].ponto < listaTimesPontuados[i + 1].ponto) {
      campeao = listaTimesPontuados[i + 1];
    } else if (
      listaTimesPontuados[i].ponto > listaTimesPontuados[i + 1].ponto
    ) {
      campeao = listaTimesPontuados[i];
    }
  }

  console.log(campeao);

  for (let i = 0; i < listaTimesPontuados.length; i++) {
    if (
      listaTimesPontuados[i] == campeao.ponto &&
      listaTimesPontuados[i].nome != campeao.nome
    ) {
      empatados.push(listaTimesPontuados[i]);
      empatados.push(campeao);
    }
  }
  console.log(empatados);

  if (empatados.length) {
    console.log("Desempate");
    const resultado = [
      Math.round(Math.random() * 5),
      Math.round(Math.random() * 5),
    ];
    const p = document.createElement("p");
    p.textContent = `${resultado[0]} - ${resultado[1]} - ${empatados[0]} vs ${
      empatados[1].nome
    } - ${empatados[sortear(2)].cidadeDoJogo} - Desempate`;
    if (resultado[0] > resultado[1]) campeao = empatados[0];
    else campeao = empatados[1];
  }
  document
    .querySelector(".campeao")
    .insertAdjacentHTML("afterend", `<h4>${campeao.nome}</h4>`);
}

function mostrarTimesNaTela() {
  rodada(1);
  const li = document.createElement("li");
  li.style.listStyle = "none";
  li.insertAdjacentHTML("beforeend", "<br>");
  ul.insertAdjacentHTML("beforeend", li.outerHTML);
  resultado(1);

  ul.insertAdjacentHTML("afterend", "<h1>Resultados: </h1>");
  rodada(2);
  resultado(2);

  document
    .querySelector("main ul:last-child")
    .insertAdjacentHTML("afterend", "<h1 class='campeao'>Campeão: </h1>");
  mostrarCampeao();
}

function estilizar(elemento) {
  document.body.style.height = "1000px";
  elemento.textContent = "";
  elemento.style.display = "block";
  elemento.style.margin = "10px 0 10px";
  elemento.style.height = "200px";
  elemento.style.width = "75%";
  elemento.style.padding = "20px";
}

function areaAdicionarTime() {
  const elemento = formulario.querySelector("#textArea");

  estilizar(elemento);

  elemento.addEventListener("keydown", (event) => {
    const valorTecla = event.keyCode;
    if (valorTecla >= 48 && valorTecla <= 57) event.preventDefault();
  });

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const valor = elemento.value;
    const armazenador = valor.split("\n");
    armazenador.forEach((value) => {
      const valor = value.split(";");
      const nome = valor[0];
      const cidade = valor[1];
      const time = new Time(nome, cidade, null, null, null);

      if (!existe(time, listaTimes)) {
        listaTimes.push(time);
      }
    });
    if (elemento.value) mostrarTimesNaTela();
    else alert("ESTÁ VAZIO");
  });
}

areaAdicionarTime();
