import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
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
  const id = parseInt(req.params.id);
  const { nome, descricao, valor, quantidade } = req.body;

  const busca = produtos.findIndex((p) => p.id === id);

  if (busca === -1) {
    res.status(404).send();
    return -1;
  }
  produtos[busca] = {
    id: id,
    nome: nome ?? produtos[busca].nome,
    descricao: descricao ?? produtos[busca].descricao,
    valor: typeof valor === "number" ? valor : (produtos[busca].valor ?? 0),
    quantidade:
      typeof quantidade === "number"
        ? quantidade
        : (produtos[busca].quantidade ?? 0),
  };

  res.status(200).json(produtos[busca]);
});

app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const busca = produtos.findIndex((p) => p.id === id);
  if (busca === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
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
