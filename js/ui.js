export function msgErro(idMsg) {
  const sm = document.getElementById(idMsg);
  sm.classList.remove("d-none");
}

export function limpMsg(idMsg) {
  const sm = document.getElementById(idMsg);

  sm.classList.add("d-none");
}
