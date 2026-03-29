CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idprodutos_UNIQUE` (`id`)
);

ALTER TABLE produtos
ADD nome VARCHAR(100) NOT NULL;