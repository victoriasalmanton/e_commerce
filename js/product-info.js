function setProductRelatedID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

/*Agrega a htmlContentToAppend la informacion de los productos. En el html de product info agregamos 
un div para ubicarlos que luego llamamos con getElementByID y mostramos en pantalla.
El método map() recorre el array de imagenes y agrega un div para cada una de ellas para mostrarlo en 
pantalla con el join paso el array a un string, para poder usarlo */
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
    .join("")} </div> `;

  /* ******* onclick */
  const htmlRelatedProductsToAppend = `<h2 class= "mt-5 dislpay-6">Productos Relacionados</h2> 
    <hr>
    <div class="row"> 
    ${product.relatedProducts
      .map(
        (relatedProduct) => `
      <div class="col-6 col-md-3" onclick="setProductRelatedID(${relatedProduct.id})" >
        <div class="card">
          <img src="${relatedProduct.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${relatedProduct.name}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("")} </div> 
 `;
  document.getElementById("relatedProducts-list-container").innerHTML =
    htmlRelatedProductsToAppend;
  document.getElementById("productsInfo-list-container").innerHTML =
    htmlContentToAppend;
}
/* define stars como string y establece 5 interaciones y se agregan estrellitas amarillas hasta 
llegar al valor del score porque 0 seria el score 1 y el resto son estrellas sin color*/
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
/* con .map agrega a la lista el nombre de usuario la fecha de emision y concatena el puntaje de estrellitas*/
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
/* 3.2 solicitud al json para obtener la info de los productos. Luego llama a showProductInfo 
pasandole por parametro el resultado del json*/
function onContentLoaded(e) {
  const productId = localStorage.getItem("productID");

  getJSONData(PRODUCT_INFO_URL + productId + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      showProductInfo(resultObj.data);
    }
  });
  /*3.3 solicitud al json para obtener comentarios* y llama a showCommentsInfo */
  getJSONData(PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      showCommentsInfo(resultObj.data);
    }
  });
}

document.addEventListener("DOMContentLoaded", onContentLoaded);
