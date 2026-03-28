import * as validadores from "./validators.js";

const valor = document.getElementById("valorProd");
const quantidade = document.getElementById("qtdProd");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  validarFormulario();

  const cadastrar = async () => {
    const produto = {
      nome: document.getElementById("produto").value,
      descricao: document.getElementById("descProd").value,
      valor: document.getElementById("valorProd").value,
      quantidade: document.getElementById("qtdProd").value,
    };

    await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(produto),
    });
  };
});

valor.addEventListener("blur", () => {
  const vValor = valor.value;
  const valorValido = validadores.validarValor(vValor);
});

quantidade.addEventListener("blur", () => {
  const vQTD = quantidade.value;
  const qtdValido = validadores.validarQTD(vQTD);
});

function validarFormulario() {
  const vValor = valor.value;
  const vQTD = quantidade.value;
  const vDescricao = document.getElementById("descProd").value;
  const vNome = document.getElementById("produto").value;

  if (vDescricao == "") {
  }

  if (vNome == "") {
  }
}
