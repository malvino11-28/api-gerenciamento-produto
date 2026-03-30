import * as validadores from "./validators.js";
import * as msg from "./ui.js";

const html = document.getElementById("div");

const form = document.getElementById("form");
const valor = document.getElementById("valorProd");
const quantidade = document.getElementById("qtdProd");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validarFormulario()) {
    cadastrar();
    html.innerHTML = "<h2>Cadastro realizado!</h2>";
  } else {
    html.innerHTML = "<h2>Cadastro falhou!</h2>";
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
    valor: parseFloat(document.getElementById("valorProd").value),
    quantidade: parseInt(document.getElementById("qtdProd").value),
  };

  try {
    const res = await fetch("/produtos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(produto),
    });
    if (res.ok) {
      form.reset();
    }
  } catch (error) {
    console.error("Erro de rede:", error);
  }
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

  const nomeValido = vNome.trim() !== "";
  const descValida = vDescricao.trim() !== "";
  const qtdValido = validadores.validarQTD(vQTD);
  const valorValido = validadores.validarValor(vValor);

  nomeValido ? msg.limpMsg("msgNom") : msg.msgErro("msgNom");
  descValida ? msg.limpMsg("msgDesc") : msg.msgErro("msgDesc");
  valorValido ? msg.limpMsg("msgV") : msg.msgErro("msgV");
  qtdValido ? msg.limpMsg("msgQTD") : msg.msgErro("msgQTD");

  return nomeValido && descValida && valorValido && qtdValido;
}
