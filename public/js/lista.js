let tabela = document.querySelector("tbody");
try {
  const res = await fetch("/produtos");
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
