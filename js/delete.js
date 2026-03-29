import * as msgs from "./ui.js";

const form = document.querySelector("form");
const idInput = document.getElementById("id");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = idInput.value;
  if (!id) {
    console.log("msgs");
    msgs.msgErro("msg");
  } else {
    msgs.limpMsg("msg");
    fetch(`http://localhost:3000/produtos/${id}`, {
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
