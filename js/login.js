function validateForm() {
  const password = document.getElementById("contraseña");
  const email = document.getElementById("email");

  // https://dorey.github.io/JavaScript-Equality-Table/
  if (!password.value) {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
  } else {
    password.classList.add("is-valid");
    password.classList.remove("is-invalid");
  }

  if (!email.value) {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
  } else {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
  }

  if (password.value && email.value) {
    localStorage.setItem("user", email.value);
    location.href = "index.html";
  }
  /*
   * si es ok guarda el email en local storage (no podes salir)
   */
}

function onContentLoaded(e) {
  const boton = document.getElementById("ingresar");
  boton.addEventListener("click", validateForm);
}

document.addEventListener("DOMContentLoaded", onContentLoaded);
