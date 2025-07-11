const menuButton = document.querySelector(".menu-button");
        const body = document.querySelector("body");
        
        menuButton.addEventListener("click", () => {
          body.classList.toggle("show-menu");
        });

       

 const itensSacola = [];
const listaItens = document.getElementById("nome-produto");
const sacola = document.getElementById("sacola");

// Adiciona item ao clicar no botão
document.querySelectorAll(".add-carrinho").forEach(button => {
  button.addEventListener("click", () => {
    const nome = button.getAttribute("data-nome");
    itensSacola.push(nome);
    atualizarListaSacola();
  });
});

// Mostrar/ocultar sacola ao clicar no carrinho
document.getElementById("icone-carrinho").addEventListener("click", () => {
  sacola.style.display = sacola.style.display === "none" ? "block" : "none";
});

// Atualiza a lista na interface
function atualizarListaSacola() {
  listaItens.innerHTML = "";

  const contador = {};
  itensSacola.forEach(item => {
    contador[item] = (contador[item] || 0) + 1;
  });

  for (let item in contador) {
    const li = document.createElement("li");
    li.textContent = `${item} (x${contador[item]})`;
    listaItens.appendChild(li);
  }
}

// Finalizar compra e enviar para WhatsApp
document.getElementById("finalizar-compra").addEventListener("click", () => {
  if (itensSacola.length === 0) {
    alert("Sua sacola está vazia!");
    return;
  }

  const contador = {};
  itensSacola.forEach(item => {
    contador[item] = (contador[item] || 0) + 1;
  });

  let mensagem = "Olá! Gostaria de finalizar a compra com os seguintes itens:\n";
  for (let item in contador) {
    mensagem += `- ${item} (x${contador[item]})\n`;
  }

  const numero = "5519994740960";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});

