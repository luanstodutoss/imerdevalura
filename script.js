const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("#campo-busca");
const botaoBusca = document.querySelector("#botao-busca");

let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();

    if (termoBusca.trim() === "") {
        renderizarCards(dados); // Mostra todos se a busca estiver vazia
        return;
    }

    const resultados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(listaDeDados) {
    cardContainer.innerHTML = ''; // Limpa os cards existentes antes de renderizar os novos

    for (let dado of listaDeDados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Site Oficial</a>
        `;
        cardContainer.appendChild(article);
    }
}

botaoBusca.addEventListener("click", iniciarBusca);

campoBusca.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        iniciarBusca();
    }
});

carregarDados(); // Chama a função para carregar e exibir os dados iniciais