export function msgErro(idMsg) {
  const sm = document.getElementById(idMsg);
  sm.style.display = "block";
}

export function limpMsg(idMsg) {
  const sm = document.getElementById(idMsg);
  sm.style.display = "none";
}
