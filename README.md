# API de Gerenciamento de Produtos

Este projeto consiste em uma aplicação web para gerenciamento de produtos, desenvolvida com foco em aprendizado de desenvolvimento backend utilizando Node.js, Express e integração com banco de dados MySQL.

A aplicação permite realizar operações completas de CRUD (Create, Read, Update, Delete), além de possuir uma interface web simples para interação com a API.

---

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- JavaScript
- HTML
- Bootstrap

---

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Atualização de produtos
- Exclusão de produtos
- Validação de dados no frontend e backend
- Integração com banco de dados MySQL
- Fallback para armazenamento em memória (array)

---

## Estrutura do Projeto

O projeto está dividido em:

- Backend: responsável pelas rotas, regras de negócio e integração com banco de dados
- Frontend: páginas HTML com JavaScript para consumo da API
- Banco de dados: estrutura MySQL para persistência dos dados

---

## Configuração do Ambiente

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

---

### 2. Instalar dependências

```bash
npm install
```

---

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=produtos
USE_DB=true
```

---

### 4. Configurar o banco de dados

Execute o script SQL abaixo no MySQL:

```sql
CREATE DATABASE IF NOT EXISTS produtos;
USE produtos;

CREATE TABLE IF NOT EXISTS produtos (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  quantidade INT NOT NULL,
  PRIMARY KEY (id)
);
```

---

### 5. Executar o projeto

```bash
node server.js
```

O servidor estará disponível em:

```bash
http://localhost:3000
```

---

## Observação sobre o funcionamento

O projeto possui dois modos de execução:

- Com banco de dados (USE_DB=true): utiliza MySQL para persistência
- Sem banco de dados (USE_DB=false): utiliza um array em memória

---

## Deploy

Link do deploy:

[ADICIONAR LINK DO VERCEL AQUI]

Observação importante:

No ambiente de deploy (Vercel), o projeto funciona utilizando armazenamento em memória (array), pois não há integração com MySQL configurada. Os dados não são persistidos após reinicialização.

---

## Interface do Projeto

Página de cadastro:

[ADICIONAR IMAGEM AQUI]

Página de listagem:

[ADICIONAR IMAGEM AQUI]

---

## Endpoints da API

### Criar produto

POST /produtos

### Listar produtos

GET /produtos

### Atualizar produto

PUT /produtos/:id

### Deletar produto

DELETE /produtos/:id

---

## Considerações Finais

Este projeto foi desenvolvido com o objetivo de consolidar conceitos fundamentais de desenvolvimento backend, incluindo:

- criação de APIs REST
- manipulação de dados
- integração com banco de dados
- organização de código
- tratamento de erros

A aplicação pode ser evoluída com melhorias como autenticação, testes automatizados, deploy com banco de dados e separação em camadas (controller, service, repository).
