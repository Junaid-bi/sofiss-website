let cart = JSON.parse(localStorage.getItem("cart")) || []

function addToCart(name,price){

cart.push({name,price})

localStorage.setItem("cart",JSON.stringify(cart))

updateCartCount()

alert(name + " added to cart")

}

function updateCartCount(){

let count=document.getElementById("cart-count")

if(count){

count.innerText=cart.length

}

}

updateCartCount()

if(document.getElementById("cart-items")){

displayCart()

}

function displayCart(){

let cartContainer=document.getElementById("cart-items")

let total=0

cartContainer.innerHTML=""

cart.forEach((item,index)=>{

total+=item.price

cartContainer.innerHTML+=`

<div>

${item.name} - ₹${item.price}

<button onclick="removeItem(${index})">Remove</button>

</div>

`

})

document.getElementById("total").innerText="Total: ₹"+total

}

function removeItem(index){

cart.splice(index,1)

localStorage.setItem("cart",JSON.stringify(cart))

displayCart()

updateCartCount()

}

function checkoutWhatsApp(){

let message="Order from SoFiss:%0A"

cart.forEach(item=>{

message+=item.name+" - ₹"+item.price+"%0A"

})

let phone="917780892946"

window.open(`https://wa.me/${phone}?text=${message}`)

}
