import * as validadores from "./validators.js";
import * as msg from "./ui.js";

const form = document.getElementById("form");
const valor = document.getElementById("valorProd");
const quantidade = document.getElementById("qtdProd");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validarFormulario()) {
    cadastrar();
  }
});

valor.addEventListener("blur", () => {
  const vValor = valor.value;
  const valorValido = validadores.validarValor(vValor);
  if (!valorValido) {
    msg.msgErro("msgV");
  } else {
    msg.limpMsg("msgV");
  }
});
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

quantidade.addEventListener("blur", () => {
  const vQTD = quantidade.value;
  const qtdValido = validadores.validarQTD(vQTD);
  if (!qtdValido) {
    msg.msgErro("msgQTD");
  } else {
    msg.limpMsg("msgQTD");
  }
});

function validarFormulario() {
  const vValor = valor.value;
  const vQTD = quantidade.value;
  const vDescricao = document.getElementById("descProd").value;
  const vNome = document.getElementById("produto").value;

  const nomeValido = vNome !== "";
  const descValida = vDescricao !== "";
  const qtdValido = validadores.validarQTD(vQTD);
  const valorValido = validadores.validarValor(vValor);

  nomeValido ? msg.limpMsg("msgNom") : msg.msgErro("msgNom");
  descValida ? msg.limpMsg("msgDesc") : msg.msgErro("msgDesc");
  valorValido ? msg.limpMsg("msgV") : msg.msgErro("msgV");
  qtdValido ? msg.limpMsg("msgQTD") : msg.msgErro("msgQTD");

  return nomeValido && descValida && valorValido && qtdValido;
}
