var items = document.getElementById('items');

//Récupération de tout les types de produit stockés dans le serveur et affichage des produits dans la page
async function logProducts() {
  const response = await fetch('http://localhost:3000/api/products/');
  const products = await response.json();

  //Boucle sur chaque type de produit pour récupérer leur propriétés
  products.forEach(product => {
    const link = document.createElement('a');
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    link.href = "product.html?id=" + product._id;
    
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    
    h3.className = "productName";
    h3.textContent = product.name;
    
    p.className = "productDescription";
    p.textContent = product.description;
    
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    
    link.appendChild(article);
    
    items.appendChild(link);
  });
}

logProducts();