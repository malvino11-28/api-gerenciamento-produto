import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let id = 1;

let pool;

if (process.env.USE_DB === "true") {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await pool.execute("SELECT 1");
    console.log("✅ Conectado ao MySQL!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MySQL:", error);
  }
}

const banco = process.env.USE_DB === "true";
const produtos = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/produtos", async (req, res) => {
  try {
    if (!banco) {
      return res.status(200).json(produtos);
    }
    const [rows] = await pool.execute("SELECT * from produtos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});

app.post("/produtos", async (req, res) => {
  try {
    const { nome, descricao, valor, quantidade } = req.body;

    if (
      !nome ||
      !descricao ||
      valor === undefined ||
      quantidade === undefined
    ) {
      return res.status(400).json({ erro: "Há campos vazios" });
    }
    if (!banco) {
      const novoProd = {
        id: id++,
        nome,
        descricao,
        valor,
        quantidade,
      };
      produtos.push(novoProd);
      return res.status(201).json(novoProd);
    }
    const [result] = await pool.execute(
      "INSERT INTO produtos (nome, descricao, valor, quantidade) VALUES (?, ?, ?, ?)",
      [nome, descricao, Number(valor), Number(quantidade)],
    );

    return res.status(201).json({
      id: result.insertId,
      nome,
      descricao,
      valor: Number(valor),
      quantidade: Number(quantidade),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao cadastrar produto" });
  }
});

app.put("/produtos/:id", async (req, res) => {
  try {
    const idParam = parseInt(req.params.id);
    const { nome, descricao, valor, quantidade } = req.body;

    if (isNaN(idParam)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    if (!banco) {
      const busca = produtos.findIndex((p) => p.id === idParam);

      if (busca === -1) {
        return res.status(404).json({ erro: "Produto não encontrado." });
      }

      const novoV = valor !== undefined ? Number(valor) : produtos[busca].valor;
      const novaQTD =
        quantidade !== undefined
          ? Number(quantidade)
          : produtos[busca].quantidade;

      if (isNaN(novoV) || isNaN(novaQTD)) {
        return res
          .status(400)
          .json({ erro: "Valor ou quantidade devem ser numéricos" });
      }
      produtos[busca] = {
        id: idParam,
        nome: nome || produtos[busca].nome,
        descricao: descricao || produtos[busca].descricao,
        valor: novoV,
        quantidade: novaQTD,
      };

      return res.status(200).json(produtos[busca]);
    }
    const [result] = await pool.execute(
      "UPDATE produtos SET nome = ?, descricao = ?, valor = ?, quantidade = ? WHERE id = ?",
      [nome, descricao, Number(valor), Number(quantidade), idParam],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Produto não encontrado. " });
    }
    return res.status(200).json({
      id: idParam,
      nome,
      descricao,
      valor: Number(valor),
      quantidade: Number(quantidade),
    });
    // db
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
});

app.delete("/produtos/:id", async (req, res) => {
  try {
    const idParam = parseInt(req.params.id);
    if (!banco) {
      const busca = produtos.findIndex((p) => p.id === idParam);

      if (isNaN(idParam)) {
        return res.status(400).json({ erro: "ID inválido." });
      }

      if (busca === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      produtos.splice(busca, 1);

      return res.status(204).send();
    }
    const [result] = await pool.execute("DELETE FROM produtos WHERE id = ?", [
      idParam,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Erro ao encontrar produto " });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao deletar produto" });
  }
});

export default app;

/*

API 

- criar produto
- listar produtos
- atualizar produto
- deletar produto

*/
