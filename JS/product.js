//https://kea-alt-del.dk/t7/api/products/1534//

//lav url search objekt
const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams", urlParams);

//find id
const id = urlParams.get("id");
console.log("id", id);
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

console.log("product.js");

async function getProduct() {
  const response = await fetch(`https://kea-alt-del.dk/t7/api/products/${id}`);
  const data = await response.json();
  console.log(data);
  showProduct(data);
}

function showProduct(product) {
  document.querySelector(".purchase h2").textContent = product.productdisplayname;
  document.querySelector(".purchase .brand").textContent = product.brandname;
  document.querySelector(".purchase .type").textContent = product.articletype;
  document.querySelector(".produkt .pris").textContent = product.price;
  //document.querySelector("#produktinfo #beskrivelse").textContent = product.brandbio;//
  document.querySelector(".beskrivelse .produktkode").textContent = product.id;
  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
}

getProduct();
