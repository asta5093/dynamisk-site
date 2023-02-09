//https://kea-alt-del.dk/t7/api/products

const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get("cat");
const url = `https://kea-alt-del.dk/t7/api/products?limit=100&category=${cat}`;

// ændre h2 til kategori
document.querySelector("h2").textContent = cat;

//1 get the data
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  //console.log(data);
  //2 loope data //3. for hvert product
  data.forEach(showProduct);
}

// kald funktion
getData();

function showProduct(product) {
  console.log(product);
  //4.fange vores template

  const template = document.querySelector("#product_card_template").content;
  console.log(template);

  //5.clone den
  const copy = template.cloneNode(true);

  //6. skifte data
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".product_card .subtle .type").textContent = product.articletype;
  copy.querySelector(".product_card .subtle .brand").textContent = product.brandname;
  copy.querySelector(".product_card .tilbud .forpris").textContent = product.price;
  copy.querySelector(".product_card .OG_pris").textContent = product.price;
  copy.querySelector(".product_card img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;

  //produkt id med URL parameter
  copy.querySelector("a").href = "produkt.html?id=" + product.id;

  if (product.soldout) {
    copy.querySelector("Article").classList.add("sold_out");
  }
  if (product.discount) {
    copy.querySelector("Article").classList.add("udsalg");
  }

  if (product.discount) {
    copy.querySelector(".product_card").classList.add("udsalg");
    copy.querySelector(".tb_pris").textContent = `${Math.round(product.price - product.price * (product.discount / 100))} DKK`;
  }

  //7. appende
  document.querySelector("main .produkt_list").appendChild(copy);
}

/*
articletype: "Tshirts"
brandname: "Puma"
category: "Apparel"
discount: null
gender: "Men"
id: 1529
price: 1899
productdisplayname: "Tee"
productionyear: 2010
season: "Fall"
soldout: 0
subcategory: "Topwear"
usagetype: "Casual" 
*/
