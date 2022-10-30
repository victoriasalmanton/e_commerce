let arrayOfProducts = [];
const shippingType1 = document.getElementById("shippingType1");
const shippingType2 = document.getElementById("shippingType2");
const shippingType3 = document.getElementById("shippingType3");

const showCartItems = () => {
  const htmlCartItemsToAppend = arrayOfProducts
    .map(
      (product) =>
        `<tr>
            <td><img src="${product.image}" width="50px"></td>
            <td>${product.name}</td>
            <td>${product.currency} ${product.unitCost}</td>
            <td><input type="number" value="${
              product.count
            }" min="1" class="form-control" style="max-width:80px" id="countBox" onchange="onCountChange(event,${
          product.id
        })">
            </td>
            <th scope="row">${product.currency} ${
          product.unitCost * product.count
        }</th>
        </tr>`
    )
    .join("");

  document.getElementById("table").innerHTML = htmlCartItemsToAppend;
};

//6.3
function showSuccessAlert() {
  const alert = document.getElementById("successAlert");

  alert.classList.remove("d-none");

  setTimeout(() => {
    alert.classList.add("d-none");
  }, 3000);
}

/* 6.1 visualizar subtotal general costo de envio y total a pagar

*inicializa subtotal en 0. 
* Con forEach toma cada producto y agrega a subtotal el producto del precio por cantidad
*inicializa una variable de porcentajes en 0 y le pone el valor condicionado por el checked
* el total a pagar es el subtotal por el costo de envio
* con innher html los mostramos en pantalla

* llamamos a esta misma funcion cuando cambia la cantidad del producto seleccionado,
 cuando se cambia el tipo de envio y cuando carga la pagina*/

const updateSummary = () => {
  let subtotal = 0;

  // calcular subtotal recorriendo array
  arrayOfProducts.forEach((product) => {
    subtotal += product.unitCost * product.count;
  });

  let shippingPercentage = 0;
  //envio premium
  if (shippingType1.checked) {
    shippingPercentage = 0.15;
    //express
  } else if (shippingType2.checked) {
    shippingPercentage = 0.07;
    //Standard
  } else if (shippingType3.checked) {
    shippingPercentage = 0.05;
  }

  // mostrar subtotal
  document.getElementById("subtotal").innerHTML = `USD ${subtotal}`;
  document.getElementById("costoEnvio").innerHTML = `USD ${Math.round(
    subtotal * shippingPercentage
  )}`;
  document.getElementById("total").innerHTML = `USD ${
    subtotal + Math.round(subtotal * shippingPercentage)
  } `;
};

const onCountChange = (e, productID) => {
  const newCount = e.target.value;
  const productToModify = arrayOfProducts.find(
    (product) => product.id === productID
  );

  productToModify.count = newCount;

  showCartItems();
  updateSummary();
};

getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
  if (resultObj.status === "ok") {
    arrayOfProducts = resultObj.data.articles;
    showCartItems();
    updateSummary();
  }
});

//6.1 //

shippingType1.addEventListener("click", updateSummary);
shippingType2.addEventListener("click", updateSummary);
shippingType3.addEventListener("click", updateSummary);

//*6.2 modal con forma de pago y deshabilitar campos innecesarios.

//obtenemos id de los botones de forma de pago y los campos del modal  */

// radio buttons
const buttonCredit = document.getElementById("buttonCredit");
const transfer = document.getElementById("transfer");

// fields credit
const cardNumber = document.getElementById("cardNumber");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");

// fields transfer
const accountNumber = document.getElementById("accountNumber");

/* 6.2 cuando se hace click en tarjeta de credito se habilitan los input correspondientes
 y se desabilidan los de la otra forma de pago.
 se muestra en el button fuera del modal el metodo seleccionado  */

buttonCredit.addEventListener("click", () => {
  cardNumber.disabled = false;
  securityCode.disabled = false;
  expiration.disabled = false;

  accountNumber.disabled = true;

  document.getElementById("formaDePago").innerHTML = "Tarjeta de Crédito";
});

transfer.addEventListener("click", () => {
  cardNumber.disabled = true;
  securityCode.disabled = true;
  expiration.disabled = true;

  accountNumber.disabled = false;

  document.getElementById("formaDePago").innerHTML = "Transferencia bancaria";
});

/// 6.3 //
const street = document.getElementById("street");
const streetNumber = document.getElementById("streetNumber");
const intersection = document.getElementById("intersection");
const paymentMethod = document.getElementById("paymentMethod");

// si no hay value le agrega clase de invalid y si tiene le agrega valid y le saca la clase invalid
const inputHasValue = (input) => {
  if (!input.value) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }

  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
  return true;
};

const validateForm = () => {
  let isValid = true;

  if (!inputHasValue(street)) isValid = false;
  if (!inputHasValue(streetNumber)) isValid = false;
  if (!inputHasValue(intersection)) isValid = false;

  if (!buttonCredit.checked && !transfer.checked) {
    buttonCredit.classList.add("is-invalid");
    transfer.classList.add("is-invalid");
    paymentMethod.classList.add("is-invalid");
    isValid = false;
  } else {
    buttonCredit.classList.remove("is-invalid");
    transfer.classList.remove("is-invalid");
    paymentMethod.classList.remove("is-invalid");
  }

  if (buttonCredit.checked) {
    if (!inputHasValue(cardNumber)) isValid = false;
    if (!inputHasValue(securityCode)) isValid = false;
    if (!inputHasValue(expiration)) isValid = false;
  } else {
    cardNumber.classList.remove("is-invalid", "is-valid");
    securityCode.classList.remove("is-invalid", "is-valid");
    expiration.classList.remove("is-invalid", "is-valid");
  }

  if (transfer.checked) {
    if (!inputHasValue(accountNumber)) isValid = false;
  } else {
    accountNumber.classList.remove("is-invalid", "is-valid");
  }

  return isValid;
};

/* Cuando apreto el boton de finalizar compra se aejecuta una funcion que aplica 
un for each a todos los input y a los radios que logre que cada vez que se hace click o se cambia algun valor, 
se llame a la funcion de validacion*/
document.getElementById("checkout").addEventListener("click", () => {
  [
    street,
    streetNumber,
    intersection,
    paymentMethod,
    cardNumber,
    securityCode,
    expiration,
    accountNumber,
  ].forEach((input) => input.addEventListener("keyup", validateForm));

  // En el caso de los buttons es un click
  [buttonCredit, transfer].forEach((input) =>
    input.addEventListener("click", validateForm)
  );

  //sucess alert
  const isValid = validateForm();
  if (isValid) {
    showSuccessAlert();
  }
});
