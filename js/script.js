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
