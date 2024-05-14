var str = window.location.href;
var url = new URL(str);
var urlId = url.searchParams.get("id");

var qte = 0;
var clr = "";
var imageUrl = "";
var altTxt = "";
var productName = "";
var productPrice = 0;

async function logProducts() {
    const response = await fetch('http://localhost:3000/api/products/'+ urlId);
    const product = await response.json();

    const itemImg = document.getElementsByClassName("item__img");
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const colors = document.getElementById("colors");

    const img = document.createElement('img');

    product.colors.forEach(color => {
        const option = document.createElement('option');
        option.value = color.toLowerCase();
        option.textContent = color;
        colors.appendChild(option);        
    });

    img.src = product.imageUrl;
    img.alt = product.altTxt;
    imageUrl = product.imageUrl;
    altTxt = product.altTxt;

    title.textContent = product.name;
    productName = product.name;

    price.textContent = product.price;
    productPrice = product.price;

    description.textContent = product.description;
    
    itemImg[0].appendChild(img);
}


function addProduct() {
    const itemObj = {
        id : urlId,
        name : productName,
        price : productPrice,        
        quantity: qte,
        color: clr,
        imageUrl: imageUrl,
        altTxt: altTxt
    };
    const itemKey = itemObj.id +'-'+ itemObj.color;

    if(localStorage.getItem(itemKey)){
        let originItem = JSON.parse(localStorage.getItem(itemKey));
        itemObj.quantity += originItem.quantity;
    }
    
    let itemLinea = JSON.stringify(itemObj);
    localStorage.setItem(itemKey,itemLinea);
}

function selectQte() {
    qte = parseInt(this.value); 
}

function selectColor() {
    clr = this.value;  
}

logProducts();

var button = document.getElementById("addToCart");
button.addEventListener('click', addProduct);

var quantity = document.getElementById("quantity");
quantity.addEventListener('input', selectQte);

var color = document.getElementById("colors");
color.addEventListener('change', selectColor);

