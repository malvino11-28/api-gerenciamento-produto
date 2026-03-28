import express from "express";

const app = express();
app.use(express.json());

c;

const produtos = [
  {
    nome: "",
    descricao: "",
    valor: 0,
    quantidade: 0,
  },
];

app.post("/produtos", (req, res) => {
  const novoProd = req.body;

  produtos.push(novoProd);
  res.status(201).json(novoProd);
});

app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

app.listen(3000);

/*

API 

- criar produto
- listar produtos
- atualizar produto
- deletar produto

*/
