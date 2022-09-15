const ORDER_ASC_BY_PRICE = "09";
const ORDER_DESC_BY_PRICE = "90";
const ORDER_BY_PROD_REL = "Rel";
let currentProductsArray = [];
let minPrice = undefined;
let maxPrice = undefined;

/* segun el criterio de ordenamiento y el array que en nuestro caso es la lista de productos compara los distintos
precios y productos vendidos de la lista y si la comparacion entre el primer producto y el segundo es + 
el segundo producto va primero en la lista; si es negativa el a a primero; si es 0 se mantienen en sus lugares */
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort((a, b) => a.cost - b.cost);
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort((a, b) => b.cost - a.cost);
  } else if (criteria === ORDER_BY_PROD_REL) {
    result = array.sort((a, b) => b.soldCount - a.soldCount);
  }
  return result;
}

/*punto 3.1 agrego onclick al div del for de showProductsList que muestra los productos en pantalla 
y en setProductID que guarda el id en el localStorage redirigimos a product-info-html. */
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

function showProductsList() {
  let htmlContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    const product = currentProductsArray[i];

    if (
      (minPrice === undefined || product.cost >= minPrice) &&
      (maxPrice === undefined || product.cost <= maxPrice)
    ) {
      htmlContentToAppend += `
        <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action">
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
  }

  document.getElementById("products-list-container").innerHTML =
    htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria) {
  currentProductsArray = sortProducts(sortCriteria, currentProductsArray);

  showProductsList();
}

/* vamos a buscar la catid especifica que estableces en index al local storage y 
luego haces el llamado al json */
function onContentLoaded(e) {
  const catId = localStorage.getItem("catID");

  getJSONData(PRODUCTS_URL + catId + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      showProductsList();
    }
  });
  /* botones de ordenado */
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document
    .getElementById("sortByRelevance")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_BY_PROD_REL);
    });
  /*boton de limpiar y filtro
   * llama a showProductsList y como es undefined muestra todo el listado
   */
  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterPriceMin").value = "";
      document.getElementById("rangeFilterPriceMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;

      showProductsList();
    });

  document
    .getElementById("rangeFilterPrice")
    .addEventListener("click", function () {
      const minValue = parseInt(
        document.getElementById("rangeFilterPriceMin").value
      );
      const maxValue = parseInt(
        document.getElementById("rangeFilterPriceMax").value
      );

      if (minValue >= 0) {
        minPrice = minValue;
      } else {
        document.getElementById("rangeFilterPriceMin").value = "";
        minPrice = undefined;
      }

      if (maxValue >= 0) {
        maxPrice = maxValue;
      } else {
        document.getElementById("rangeFilterPriceMax").value = "";
        maxPrice = undefined;
      }

      showProductsList();
    });
}

// e de evento. cuando pase un evento ejecuta esta funcion. dom content loaded cuando el evento termine de cargar
// add event listener toma or parametros el evento y la referencia de la funcion que va a llamar cuando el evento ocurra. No le pones parentesis.
document.addEventListener("DOMContentLoaded", onContentLoaded);
