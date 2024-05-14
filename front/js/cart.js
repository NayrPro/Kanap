const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
totalQuantity.textContent = parseInt(localStorage.length);
var accPrice = 0;

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


    input.addEventListener('change', function selectQte(e) {
        const currentQty = data.quantity;
        data.quantity = parseInt(e.target.value);
        const closest = e.target.closest(".cart__item");
        const dataId = closest.getAttribute("data-id");
        const dataColor = closest.getAttribute("data-color");
        const itemKey = dataId+"-"+dataColor;

        localStorage.setItem(itemKey, JSON.stringify(data));

        if(e.target.value > currentQty){
            accPrice += data.price;
        }else{
            accPrice -= data.price;

        }
        totalPrice.textContent = accPrice;
    });

    pDelItem.addEventListener('click', function deleteItem(e) {
        accPrice -= data.price*data.quantity;
        
        const closest = e.target.closest(".cart__item");
        const dataId = closest.getAttribute("data-id");
        const dataColor = closest.getAttribute("data-color");
        const itemKey = dataId+"-"+dataColor;
        
        localStorage.removeItem(itemKey);
        closest.remove();

        totalQuantity.textContent = localStorage.length;
        totalPrice.textContent = accPrice;
    });
}


totalPrice.textContent = parseInt(accPrice);