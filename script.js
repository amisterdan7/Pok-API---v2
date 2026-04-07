const input = document.querySelector("#inputPokemon");
const botao = document.querySelector("#btnBuscar");

const areaResultado = document.querySelector("#resultado");
const nome = document.querySelector("#nome");
const imagem = document.querySelector("#imagem");
const tipos = document.querySelector("#tipos");
const stats = document.querySelector("#stats");
const erro = document.querySelector("#erro");

//  EVENTO
botao.addEventListener("click", buscarPokemon);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarPokemon();
  }
});

// FUNÇÃO PRINCIPAL
async function buscarPokemon() {
  const valor = input.value.trim().toLowerCase();

  // VaLIDAÇÃO
  if (!valor) {
    mostrarErro("Digite um nome ou ID.");
    return;
  }

  limparTela();

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${valor}`;

    const resposta = await fetch(url);

    // VERIFICAR ERRO HTTP
    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const dados = await resposta.json();

    mostrarPokemon(dados);
  } catch (e) {
    mostrarErro(e.message);
  }
}

// MOSTRAR POKÉMON
function mostrarPokemon(dados) {
  nome.textContent = dados.name;

  // IMAGEM (HD)
  const img =
    dados.sprites.other["official-artwork"].front_default ||
    dados.sprites.front_default;

  imagem.src = img;

  imagem.onerror = () => {
    imagem.src = "Captura de tela_6-4-2026_183614_.jpeg";
  };

  // Ocultar a imagem enquanto não for carregada
  imagem.style.display = "none";
  imagem.onload = () => {
    imagem.style.display = "block";
  };

  //  TIPOS
  tipos.innerHTML = "";
  dados.types.forEach((tipoInfo) => {
    const span = document.createElement("span");
    span.textContent = tipoInfo.type.name;
    tipos.appendChild(span);
  });

  // STATS
  stats.innerHTML = "<h3>Stats:</h3>";
  dados.stats.forEach((stat) => {
    const p = document.createElement("p");
    p.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    stats.appendChild(p);
  });

  // MOSTRAR RESULTADO
  areaResultado.classList.remove("oculto");
}

// MOSTRAR ERRO
function mostrarErro(msg) {
  erro.textContent = msg;
  erro.classList.remove("oculto");
}

//LIMPAR TELA
function limparTela() {
  areaResultado.classList.add("oculto");
  erro.classList.add("oculto");
  tipos.innerHTML = "";
  stats.innerHTML = "";
}
