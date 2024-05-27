var str = window.location.href;
var url = new URL(str);
var urlId = url.searchParams.get("id");

var qte = 0;
var clr = "";
var imageUrl = "";
var altTxt = "";
var productName = "";
var productPrice = 0;

//Récuperation des données d'un produit et affichage de ces données dans la page
async function logProducts() {
    const response = await fetch('http://localhost:3000/api/products/'+ urlId);
    const product = await response.json();

    const itemImg = document.getElementsByClassName("item__img");
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const colors = document.getElementById("colors");

    const img = document.createElement('img');

    //Récupération de chaque couleurs du produit à sélectionner dans le bouton select
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

//Ajout du produit avec sa quantité et sa couleur dans le panier
function addProduct() {
    let quantityValue = parseInt(quantity.value);
    let colorsValue = color.value.length;
    let interval = quantityValue <= 100 && quantityValue > 0;

    //Vérifie que le contenu des champs est valide
    if(interval && colorsValue > 0)
    {
        let itemObj = {
        id : urlId,
        name : productName,
        price : productPrice,        
        quantity: qte,
        color: clr,
        imageUrl: imageUrl,
        altTxt: altTxt
        };
        const itemKey = itemObj.id +'-'+ itemObj.color;

        //Si le produit existe déjà dans le panier, seul la quantité sera modifiée
        if(localStorage.getItem(itemKey)){
            let originItem = JSON.parse(localStorage.getItem(itemKey));
            let originQty = originItem.quantity;
            let newQty = itemObj.quantity;
            let qtySum = originQty + newQty;
            if(qtySum > 100){
                itemObj.quantity = 100;
            }else{
                itemObj.quantity += originItem.quantity;
            }
        }
        
        let itemLinea = JSON.stringify(itemObj);
        localStorage.setItem(itemKey,itemLinea);
    }else{
        alert("Champs non valide!");
    }
}

//S'assure que la quantité saisie est un nombre positif
function selectQte() {

    let qteValue = this.value; 

    if(qteValue > 100){
        this.value = 100;
        qte = parseInt(this.value, 10);
    }else if(qteValue < 0){
        this.value = 0;
        qte = parseInt(this.value, 10);
    }else{
        qte = parseInt(this.value, 10);
    }
}

//Valorisation de la couleur selectionnée du produit
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

