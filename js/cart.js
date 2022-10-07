let arrayOfProducts = [];

/* 5.1 toma cada objeto del array que son productos y le añade una tabla que muestra
 imagen, nombre, cantidad, costo.

  5.3 Onchange en input de cantidad ejecuta la funcion cuando el valor del input se cambia.
  Ejecuta onCountChange que tiene evento y id como parametro */
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
            }" min="1" class="form-control" style="max-width:80px" onchange="onCountChange(event,${
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
/* 5.3 e es el evento que se ejecuta 
    target es el elemento html que lanzo el evento como getElementById

  *newCount es el input cambiado
   
   OnCountChange busca en array de productos el producto con igual id al del parametro
   y hace que el count de ese producto tome la nueva cantidad que se inserto en el input
   llama de nuevo a showCartItems porque el calculo del Subtotal es el producto de 
   la cantidad por el precio unitario y ahi los modifica*/

const onCountChange = (e, productID) => {
  const newCount = e.target.value;
  const productToModify = arrayOfProducts.find(
    (product) => product.id === productID
  );

  productToModify.count = newCount;

  showCartItems();
};

/* 5.1 atributo defer hace que el script se descargue en paralelo al resto pero 
se ejectua luego de que la pag se analice. Ahorra el add event listener DOMContentLoaded

Hacemos solicitud al json, guarda en array que es vacio y llama a showCartItem*/
getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
  if (resultObj.status === "ok") {
    arrayOfProducts = resultObj.data.articles;
    showCartItems();
  }
});
