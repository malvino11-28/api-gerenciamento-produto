const cadastrar = async () => {
  const produto = {
    nome: document.getElementById("produto"),
    descricao: document.getElementById("descProd"),
    valor: document.getElementById("valorProd"),
    quantidade: document.getElementById("qtdProd"),
  };

  await fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(produto),
  });
};
