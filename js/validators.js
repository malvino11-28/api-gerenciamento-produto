import test from "node:test";

let padrao;

export function validarValor(valor) {
  padrao = /^\d+(\.\d+)?$/;
  return padrao.test(valor);
}

export function validarQTD(qtd) {
  padrao = /^\d+$/;
  return padrao.test(qtd);
}
