import * as msgs from "./ui.js";

const form = document.getElementById("formD");
const idInput = document.getElementById("id");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = idInput.value;
  if (!id) {
    console.log("msgs");
    msgs.msgErro("msg");
  } else {
    msgs.limpMsg("msg");
    fetch(`/produtos/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          console.log("deletado");
          idInput.value = "";
          location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
