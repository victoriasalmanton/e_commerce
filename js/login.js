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
    location.href = "inicio.html";
  }
}

function onContentLoaded(e) {
  const boton = document.getElementById("ingresar");
  boton.addEventListener("click", validateForm);
}

document.addEventListener("DOMContentLoaded", onContentLoaded);

/**
 * Le agregamos id a la contraseña y al boton y al email.
 * el add event listener cuando carga el dom ejecuta el oncontentloaded que agarra el botom y cuando hace click va a validet form.
 * el valid form obtiene contraseña e email del dom y  si no tiene contraseña le agrega la clase a la contraseña de que sea invalida
 *  y eso le agrega estilo on bootstrap y genera el recuadro rojo en el input de contraseña cuando se apreta el botn de registrarse, y luego le saca la clase por si ponen contraseña.
 * El if siguente hace lo mismo para el email.
 * El ultimo if dice que si tiene contraseña y tiene email al apretar el botton le redirija a la pagina de inicio.
 */
