//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
// con {products} filtro a que solo me agarre solo el parametro products dentro del objeto
function showProductsList({ products }) {
  // content to append tiene que ser let porque varia
  let htmlContentToAppend = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${product.name} ${product.currency} ${product.cost}</h4> 
                        <p>${product.description}</p> 
                        </div>
                        <small class="text-muted"> ${product.soldCount} Vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
  }

  document.getElementById("products-list-container").innerHTML =
    htmlContentToAppend;
}

/* vamos a buscar la catid especifica que estableces en index al local storage y luego haces el llamado al json */
function onContentLoaded(e) {
  const catId = localStorage.getItem("catID");

  getJSONData(PRODUCTS_URL + catId + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      showProductsList(resultObj.data);
    }
  });
}

// e de evento. cuando pase un evento ejecuta esta funcion. dom content loaded cuando el evento termine de cargar
// add event listener toma or parametros el evento y la referencia de la funcion que va a llamar cuando el evento ocurra. No le pones parentesis.
document.addEventListener("DOMContentLoaded", onContentLoaded);
