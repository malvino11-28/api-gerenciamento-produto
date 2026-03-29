let tabela = document.querySelector("tBody");
try {
  const res = await fetch("http://localhost:3000/produtos");
  if (res.ok) {
    const dados = await res.json();

    dados.forEach((element) => {
      tabela.innerHTML += `<tr>
            <td>${element.id}</td>
            <td>${element.nome}</td>
            <td>${element.descricao}</td>
            <td>R$ ${element.valor}</td>
            <td>${element.quantidade}</td>
          </tr>`;
    });
  }
} catch (error) {
  console.error("Erro ao buscar produtos:", error);
}
