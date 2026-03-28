import express from "express";

const app = express();
app.use(express.json());

const produtos = [];

app.post("/produtos", (req, res) => {
  produtos.push(req.body);
  res.status(201).json(req.body);
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
