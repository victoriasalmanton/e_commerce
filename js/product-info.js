function showProductInfo(product) {
  const htmlContentToAppend = `<h1 class= "mt-3 display-6"  >${
    product.name
  }</h1>
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

function starRating(score) {
  let stars = " ";

  for (let i = 0; i < 5; i++) {
    if (i < score) {
      stars += `<span class="fa fa-star checked"></span>`;
    } else {
      stars += `<span class="fa fa-star"></span>`;
    }
  }

  return stars;
}

function showCommentsInfo(comments) {
  const htmlContentToAppend = `<h2 class="my-4">Comentarios</h2>
  
  <ul class="list-group">
  ${comments
    .map(
      (comment) => `
      <li class="list-group-item"> <strong>${comment.user}</strong> - ${
        comment.dateTime
      } - ${starRating(comment.score)}
      <br>${comment.description}</li>
  `
    )
    .join("")}  
</ul>
  `;

  document.getElementById("productsComments-list-container").innerHTML =
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

  getJSONData(PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      showCommentsInfo(resultObj.data);
    }
  });
}

document.addEventListener("DOMContentLoaded", onContentLoaded);
