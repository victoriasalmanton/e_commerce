const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

const user = localStorage.getItem("user");

if (!user) {
  location.href = "login.html";
}

/* si no tiene user va al login y deshacemos el cambio de nombre de archivos */

function logOut() {
  localStorage.removeItem("user");
}

const item = document.querySelector("#navbarNav .nav-item:last-child");
item.innerHTML = `<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
${user}
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
  <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
  <li><a onclick="logOut()" class="dropdown-item" href="login.html">Cerrar sesión</a></li>
</ul>
</div>`;
/* 
* 4.2 agregamos el codigo de dropdown de bootstrap y le pasamos el usuario
y los respectivos enlaces a cada elemento de la lista desplegable.
* al boton de cerrar sesion le agregamos un onclick y una llamada a la funcion logOut
 que elimine el usuario guardado en localStorage y redirija login.html.
*/
