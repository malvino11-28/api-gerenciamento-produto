import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("certo");
});

app.listen(3000);
