document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle
  const menuButton = document.querySelector(".menu-button");
  const body = document.querySelector("body");

  if (menuButton && body) {
    menuButton.addEventListener("click", () => {
      body.classList.toggle("show-menu");
    });
  }

  // Botão adicionar à sacola
  document.querySelectorAll(".add-carrinho").forEach(button => {
    button.addEventListener("click", () => {
      const nome = button.getAttribute("data-nome");

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      carrinho.push(nome);

      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      alert(`${nome} adicionado à sacola!`);
    });
  });

  // Exibir sacola se botão carrinho for clicado (caso tenha modal)
  const sacola = document.getElementById("sacola");
  if (document.getElementById("icone-carrinho") && sacola) {
    document.getElementById("icone-carrinho").addEventListener("click", () => {
      sacola.style.display = sacola.style.display === "none" ? "block" : "none";
    });
  }

  // Tooltip WhatsApp
  const tooltip = document.getElementById("tooltip-whatsapp");
  const whatsappContainer = document.querySelector(".whatsapp-container");

  if (tooltip) {
    tooltip.classList.add("show");
    setTimeout(() => {
      tooltip.classList.remove("show");
    }, 4000);
  }

  if (whatsappContainer && tooltip) {
    whatsappContainer.addEventListener("mouseenter", () => {
      tooltip.classList.add("show");
    });
    whatsappContainer.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show");
    });
  }

  // Se estiver na página do carrinho, carregar itens
  if (document.getElementById("lista-carrinho")) {
    carregarCarrinho();
  }

  // Botão de finalizar compra
  const btnFinalizar = document.getElementById("finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      const contador = {};
      carrinho.forEach(item => {
        contador[item] = (contador[item] || 0) + 1;
      });

      let mensagem = "Olá! Gostaria de comprar os seguintes itens:\n";
      for (let item in contador) {
        mensagem += `- ${item} (x${contador[item]})\n`;
      }

      const url = `https://wa.me/5519994740960?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
    });
  }
});

// Função para carregar carrinho na página carrinho.html
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  const contador = {};
  carrinho.forEach(item => {
    contador[item] = (contador[item] || 0) + 1;
  });

  Object.keys(contador).forEach(nome => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span>${nome} (x${contador[nome]})</span>
      <button onclick="removerItem('${nome}')">Remover</button>
    `;
    lista.appendChild(div);
  });
}

function removerItem(nome) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const index = carrinho.indexOf(nome);
  if (index > -1) {
    carrinho.splice(index, 1);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}
