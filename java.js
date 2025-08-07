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
      const preco = parseFloat(button.getAttribute("data-preco"));

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      carrinho.push({ nome, preco });

      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      alert(`${nome} adicionado à sacola!`);
    });
  });

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
  const btnFinalizar = document.getElementById("finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      const contador = {};
      carrinho.forEach(item => {
        if (contador[item.nome]) {
          contador[item.nome].quantidade++;
        } else {
          contador[item.nome] = {
            quantidade: 1,
            preco: item.preco
          };
        }
      });

      let mensagem = "Olá! Gostaria de comprar os seguintes itens:\n";
      for (const nome in contador) {
        mensagem += `- ${nome} (x${contador[nome].quantidade})\n`;
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
    atualizarTotal(0);
    return;
  }

  const contador = {};
  carrinho.forEach(item => {
    if (contador[item.nome]) {
      contador[item.nome].quantidade++;
    } else {
      contador[item.nome] = {
        quantidade: 1,
        preco: item.preco
      };
    }
  });

  let total = 0;

  for (const nome in contador) {
    const item = contador[nome];
    const itemTotal = item.preco * item.quantidade;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span>${nome} (x${item.quantidade}) - R$ ${itemTotal.toFixed(2)}</span>
      <button onclick="removerItem('${nome}')">Remover</button>
    `;
    lista.appendChild(div);
  }

  atualizarTotal(total);
}

function removerItem(nome) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  // Remove a primeira ocorrência do item com esse nome
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index > -1) {
    carrinho.splice(index, 1);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

function atualizarTotal(valor) {
  let totalElem = document.getElementById("total-carrinho");
  if (!totalElem) {
    totalElem = document.createElement("div");
    totalElem.id = "total-carrinho";
    totalElem.style.fontWeight = "bold";
    totalElem.style.marginTop = "10px";
    const lista = document.getElementById("lista-carrinho");
    lista.parentNode.appendChild(totalElem);
  }
  totalElem.textContent = `Total: R$ ${valor.toFixed(2)}`;
}
