function showProductInfo(product) {
  const htmlContentToAppend = `<h1>${product.name}</h1>
  <br />
  <hr />
  <p class="fw-bold">Precio</p>
  <p> ${product.currency} ${product.cost} </p>
  <p class="fw-bold">Descripción</p>
  <p> ${product.description} </p>
  <p class="fw-bold">Categoría</p>
  <p> ${product.category} </p>
  <p class="fw-bold">Cantidad de vendidos</p>
  <p> ${product.soldCount}<p>
  <p class="fw-bold">Imagenes ilustrativas</p>
  <div class="row">
  ${product.images
    .map(
      (img) => `
    <div class="col-6 col-md-3">
      <img src="${img}" class="img-thumbnail" alt="...">
    </div>
  `
    )
    .join("")}  
  `;
  document.getElementById("productsInfo-list-container").innerHTML =
    htmlContentToAppend;
}

function onContentLoaded(e) {
  const productId = localStorage.getItem("productID");

  getJSONData(PRODUCT_INFO_URL + productId + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      showProductInfo(resultObj.data);
    }
  });

  /*getJSONData(PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      showCommentsInfo(resultObj.data);
    }
  });*/
}

function showCommentsInfo(product) {
  const htmlContentToAppend = `<h1>Comentarios</h1>
    <br />
    <hr />
    <p class="fw-bold">Precio</p>
    <p> ${product.currency} ${product.cost} </p>
    <p class="fw-bold">Descripción</p>
    <p> ${product.description} </p>
    <p class="fw-bold">Categoría</p>
    <p> ${product.category} </p>
    <p class="fw-bold">Cantidad de vendidos</p>
    <p> ${product.soldCount}<p>
    <p class="fw-bold">Imagenes ilustrativas</p>
    <div class="row">
    ${product.images
      .map(
        (img) => `
      <div class="col-3">
        <img src="${img}" class="img-thumbnail" alt="...">
      </div>
    `
      )
      .join("")}  
    `;
  document.getElementById("products-list-container").innerHTML =
    htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", onContentLoaded);
