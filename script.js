let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCart();

function addToCart(name,price){

cart.push({name,price});

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

alert("Added to cart");

}

function updateCart(){

let count = cart.length;

document.querySelectorAll("#cart-count").forEach(el=>{
el.innerText = count;
});

let cartItems = document.getElementById("cart-items");

if(cartItems){

cartItems.innerHTML="";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML +=
`<li>${item.name} - ₹${item.price}
<button onclick="removeItem(${index})">Remove</button>
</li>`;

});

document.getElementById("total").innerText = total;

}

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}

function clearCart(){

cart=[];

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}