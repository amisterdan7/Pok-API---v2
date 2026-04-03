const input = document.querySelector("#inputPokemon");
const botao = document.querySelector("#btnBuscar");

const areaResultado = document.querySelector("#resultado");
const nome = document.querySelector("#nome");
const imagem = document.querySelector("#imagem");
const tipos = document.querySelector("#tipos");
const stats = document.querySelector("#stats");
const erro = document.querySelector("#erro");

botao.addEventListener("click", buscarPokemon);

async function buscarPokemon() {
  const valor = input.value.trim().toLowerCase();

  if (valor === "") {
    mostrarErro("Digite um nome ou ID.");
    return;
  }

  limparTela();

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);

    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const dados = await resposta.json();

    mostrarPokemon(dados);
  } catch (e) {
    mostrarErro(e.message);
  }
}

function mostrarPokemon(dados) {
  nome.textContent = dados.name;

  // Imagem (melhor qualidade)
  imagem.src = dados.sprites.other["official-artwork"].front_default;

  // Limpar tipos
  tipos.innerHTML = "";

  dados.types.forEach((tipoInfo) => {
    const span = document.createElement("span");
    span.textContent = tipoInfo.type.name;
    tipos.appendChild(span);
  });

  // mostrar status
  stats.innerHTML = "<h3>Stats:</h3>";

  dados.stats.forEach((stat) => {
    const p = document.createElement("p");
    p.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    stats.appendChild(p);
  });

  areaResultado.classList.remove("oculto");
}

function mostrarErro(msg) {
  erro.textContent = msg;
  erro.classList.remove("oculto");
}

function limparTela() {
  areaResultado.classList.add("oculto");
  erro.classList.add("oculto");
  tipos.innerHTML = "";
  stats.innerHTML = ""; // limpar stats também
}
