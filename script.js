function searchProducts(){

let input = document.getElementById("search").value.toLowerCase();

let products = document.querySelectorAll(".product");

products.forEach(product=>{

let name = product.innerText.toLowerCase();

if(name.includes(input)){
product.style.display="block";
}else{
product.style.display="none";
}

});

}
