var str = window.location.href;
var url = new URL(str);
var urlId = url.searchParams.get("id");

const orderId = document.getElementById("orderId");
orderId.textContent = urlId;
