import * as msgs from "./ui.js";

const form = document.getElementById("formP");

// Selecionando todos os campos necessários
const idInput = document.getElementById("idPut");
const nameInput = document.getElementById("namePut");
const descInput = document.getElementById("descPut");
const valorInput = document.getElementById("valorPut");
const qtdInput = document.getElementById("qtdPut");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = idInput.value;

  if (!id) {
    msgs.msgErro("msgPut");
    return;
  }

  msgs.limpMsg("msgPut");

  // Criamos o objeto completo conforme os campos do seu servidor
  const produtoAtualizado = {
    nome: nameInput.value,
    descricao: descInput.value,
    valor: parseFloat(valorInput.value),
    quantidade: parseInt(qtdInput.value),
  };

  fetch(`http://localhost:3000/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(produtoAtualizado),
  })
    .then((res) => {
      if (res.ok) {
        console.log("Produto atualizado com sucesso!");
        form.reset();
        location.reload();
      } else {
        console.error("Erro ao atualizar. Status:", res.status);
      }
    })
    .catch((error) => {
      console.error("Erro na conexão:", error);
    });
});
