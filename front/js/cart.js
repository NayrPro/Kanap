const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

var accPrice = 0;
var accQty = 0;

//Parcours du localStorage pour récupérer chaque produit avec ses propriétés
for( let i = 0; i < localStorage.length; i++){
    const obj = localStorage.getItem(localStorage.key(i));
    const data = JSON.parse(obj);
  
    const article = document.createElement('article');
    const cartItemImg = document.createElement('div');
    const cartItemContent = document.createElement('div');
    const cartItemContentDesc = document.createElement('div');
    const cartItemContentSet = document.createElement('div');
    const cartItemContentSetQty = document.createElement('div');
    const cartItemContentSetDel = document.createElement('div');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const pColor = document.createElement('p');
    const pPrice = document.createElement('p');
    const Qty = document.createElement('p');
    const pDelItem = document.createElement('p');
    const input = document.createElement('input');


    article.className = "cart__item";
    cartItemImg.className = "cart__item__img";
    cartItemContent.className = "cart__item__content";
    cartItemContentDesc.className = "cart__item__content__description";
    cartItemContentSet.className = "cart__item__content__settings";
    cartItemContentSetQty.className = "cart__item__content__settings__quantity";
    cartItemContentSetDel.className = "cart__item__content__settings__delete";
    pDelItem.className = "deleteItem";
    input.className = "itemQuantity";


    img.src = data.imageUrl;
    img.alt = data.altTxt;
    h2.textContent = data.name;
    pColor.textContent = data.color;
    pPrice.textContent = data.price+" €";
    accPrice += data.price*data.quantity;
    accQty += data.quantity;
    Qty.textContent = "Qté : ";
    pDelItem.textContent = "Supprimer";
    input.type = "number";
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = data.quantity; 


    article.setAttribute('data-id', data.id);
    article.setAttribute('data-color', data.color);


    cartItemContentSetQty.appendChild(Qty);
    cartItemContentSetQty.appendChild(input);
    cartItemContentSetDel.appendChild(pDelItem);
    cartItemContentSet.appendChild(cartItemContentSetQty);
    cartItemContentSet.appendChild(cartItemContentSetDel);
    cartItemContentDesc.appendChild(h2);
    cartItemContentDesc.appendChild(pColor);
    cartItemContentDesc.appendChild(pPrice);
    cartItemContent.appendChild(cartItemContentDesc);
    cartItemContent.appendChild(cartItemContentSet);
    cartItemImg.appendChild(img);
    article.appendChild(cartItemImg);
    article.appendChild(cartItemContent);
    cartItems.appendChild(article);


    //Valorisation + Controle de saisie de l'élément input gérant la quantité d'un produit
    input.addEventListener('input', function selectQte(e) {
        const currentQty = data.quantity;
        ctrlQte(e);
        const closest = e.target.closest(".cart__item");
        const dataId = closest.dataset.id;
        const dataColor = closest.dataset.color;
        const itemKey = dataId+"-"+dataColor;

        localStorage.setItem(itemKey, JSON.stringify(data));

        accPrice -= data.price*currentQty;
        accPrice += data.price*data.quantity;

        accQty -= currentQty;
        accQty += data.quantity;

        totalPrice.textContent = accPrice;
        totalQuantity.textContent = accQty;
    });

    //Le contenu de l'élément input gérant la quantité est automatiquement sélectionné au focus
    input.addEventListener('focus', () => {
        input.select();
    });

    //Le contenu de l'élément input gérant la quantité est automatiquement valorisé à 1 si son contenu n'est pas un nombre positif
    //lorsque le focus est perdu
    input.addEventListener('blur', () => {
        if (input.value === '' || isNaN(input.value)) {
            input.value = 1;
        }
    });

    //S'assure que la quantité saisie est un nombre positif avant d'être stocké localement
    function ctrlQte(e) {
    
        let qteValue = e.target.value; 
    
        if(qteValue > 100){
            e.target.value = 100;
            data.quantity = parseInt(e.target.value, 10);
        }else if(qteValue < 0 || isNaN(qteValue) || qteValue === ''){
            e.target.value = 1;
            data.quantity = parseInt(e.target.value, 10);
        }else{
            data.quantity = parseInt(e.target.value, 10);
        }
    }

    //Evenement retirant localement le produit et modifie la quantité et le prix total du panier
    pDelItem.addEventListener('click', function deleteItem(e) {
        accPrice -= data.price*data.quantity;
        accQty -= data.quantity;
        const closest = e.target.closest(".cart__item");
        const dataId = closest.dataset.id;
        const dataColor = closest.dataset.color;
        const itemKey = dataId+"-"+dataColor;
        localStorage.removeItem(itemKey);
        closest.remove();

        totalQuantity.textContent = accQty;
        totalPrice.textContent = accPrice;
    });
}


totalPrice.textContent = parseInt(accPrice);
totalQuantity.textContent = parseInt(accQty);

const alphabetOnlyRegex = /^[a-zA-Z]+$/;
const regexAddress = /^[a-zA-Z0-9\s,'-]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const order = document.getElementById("order");

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");


/** 
 * Evenements pour chaque input du formulaire controlant la validité de la saisie,
 * un message d'erreur s'affiche si la saisie ne respecte pas le formzat Regex correspondant
**/

firstName.addEventListener('input', function (e) {
    const inputFirstName = e.target.value;
    const isFirstNameValid = alphabetOnlyRegex.test(inputFirstName);
    if(!isFirstNameValid){
        firstNameErrorMsg.textContent = "Prénom invalide";
    }else{
        firstNameErrorMsg.textContent = "";
    }
})

lastName.addEventListener('input', function (e) {
    const inputLastName = e.target.value;
    const isLastNameValid = alphabetOnlyRegex.test(inputLastName);
    if(!isLastNameValid){
        lastNameErrorMsg.textContent = "Nom invalide";
    }else{
        lastNameErrorMsg.textContent = "";
    }
})

address.addEventListener('input', function (e) {
    const inputAddress = e.target.value;
    const isAddressValid = regexAddress.test(inputAddress);
    if(!isAddressValid){
        addressErrorMsg.textContent = "Adresse invalide";
    }else{
        addressErrorMsg.textContent = "";
    }
})

city.addEventListener('input', function (e) {
    const inputCity = e.target.value;
    const isCityValid = alphabetOnlyRegex.test(inputCity);
    if(!isCityValid){
        cityErrorMsg.textContent = "Ville invalide";
    }else{
        cityErrorMsg.textContent = "";
    }
})

email.addEventListener('input', function (e) {
    const inputEmail = e.target.value;
    const isEmailValid = regexEmail.test(inputEmail);
    if(!isEmailValid){
        emailErrorMsg.textContent = "Email invalide";
    }else{
        emailErrorMsg.textContent = "";
    }
})


//Evenement controlant la validation du formulaire et l'envoi de ces données dans le serveur
order.addEventListener('click', async function (e) {
    const testFirstName = firstNameErrorMsg.textContent;
    const testLastName = lastNameErrorMsg.textContent;
    const testAddress = addressErrorMsg.textContent;
    const testCity = cityErrorMsg.textContent;
    const testEmail = emailErrorMsg.textContent;
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const addressValue = address.value;
    const cityValue = city.value;
    const emailValue = email.value;

    const testFormMsg = (testFirstName == "" & testLastName == "" & testAddress == "" & testCity == "" & testEmail == "");
    const testForm = (firstNameValue == "" || lastNameValue == "" || addressValue == "" || cityValue == "" || emailValue == "");
    
    if(!testFormMsg || testForm){
        e.preventDefault();
        alert("Données saisies incorrects");
    }else{
        const container = document.getElementById('cart__items');
        const cartItems = container.querySelectorAll('*');
        const productsIds = Array.from(cartItems)
                   .map(element => element.dataset.id)
                   .filter(id => id);

        let orderObj = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: productsIds,
        };
        await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(orderObj)
        })
        .then(response => response.json())
        .then(data => {
            const params = data.orderId;
            window.location.href = `confirmation.html?id=${params}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
})