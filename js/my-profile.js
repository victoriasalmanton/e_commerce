/* 7.1  * Se generan los inputs necesarios en el html
* en el init tenemos una funcion que decia que si no existia user redirigiera al login 
al estar en el init sirve de filtro para el resto de las pagnas*/

const validInput = (input) => {
  if (!input.value) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  const firstName = document.getElementById("firstName");
  const firstSurname = document.getElementById("firstSurname");
  const contactNumber = document.getElementById("contactNumber");
  // guarda ls valores del input en localstorage y eso hace que al entrar de nuevo permanezcan completos
  document.getElementById("email").value = localStorage.getItem("user");
  firstName.value = localStorage.getItem("firstName");
  firstSurname.value = localStorage.getItem("firstSurname");
  contactNumber.value = localStorage.getItem("contactNumber");

  //7.2 llama a validInput y valida los campos.
  const validateChanges = () => {
    let isValid = true;
    if (!validInput(firstName)) isValid = false;
    if (!validInput(firstSurname)) isValid = false;
    if (!validInput(contactNumber)) isValid = false;
    return isValid;
  };
  // no deje escribir mas de 11 digitos y que sean numeros
  contactNumber.addEventListener("keydown", (event) => {
    if (contactNumber.value.length === 11 && /^[0-9]+$/.test(event.key))
      event.preventDefault();
  });

  //si los campos se validan se guarda la informacion
  document.getElementById("saveChanges").addEventListener("click", () => {
    const isValid = validateChanges();
    if (isValid) {
      localStorage.setItem("firstName", firstName.value);
      localStorage.setItem("firstSurname", firstSurname.value);
      localStorage.setItem("contactNumber", contactNumber.value);
    }
  });
});
