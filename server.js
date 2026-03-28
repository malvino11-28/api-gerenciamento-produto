import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let id = 1;

const produtos = [];

app.post("/produtos", (req, res) => {
  const { nome, descricao, valor, quantidade } = req.body;
  const novoProd = {
    id: id++,
    nome,
    descricao,
    valor,
    quantidade,
  };

  produtos.push(novoProd);
  res.status(201).json(novoProd);
});

app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

app.put("/produtos/:id", (req, res) => {
  const { id } = Number(req.params.id);
  const { nome, descricao, valor, quantidade } = req.body;

  const busca = produtos.findIndex((p) => p.id === id);

  if (!findIndex()) {
    res.status(404);
    return -1;
  }
  produtos[busca] = {
    id: id,
    nome: nome || produtos[busca].nome,
    descricao: descricao || produtos[busca].descricao,
    valor: valor || produtos[busca].valor,
    quantidade: quantidade || produtos[busca].quantidade,
  };

  res.status(200).json(produtos[busca]);
});

app.delete("/produtos/:id", (req, res) => {
  const { id } = Number(req.params.id);
  const busca = produtos.findIndex((p) => p.id === id);
  if (!findIndex()) {
    res.status(404);
    return -1;
  }
  produtos.splice(busca, 1);

  res.status(204).send();
});

app.listen(3000);

/*

API 

- criar produto
- listar produtos
- atualizar produto
- deletar produto

*/
