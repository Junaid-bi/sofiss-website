let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartCount();
  alert(name + " added to cart");
}

function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) {
    count.innerText = cart.length;
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (!cart.length) {
    cartContainer.innerHTML = '<p>Your cart is empty. Add products from the shop.</p>';
  }

  cart.forEach((item, index) => {
    cartContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.innerText = "Total: ₹" + getCartTotal();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}

function goToCheckout() {
  if (!cart.length) {
    alert("Your cart is empty. Please add items first.");
    return;
  }
  window.location.href = "checkout.html";
}

function displayCheckoutSummary() {
  const checkoutItems = document.getElementById("checkout-items");
  if (!checkoutItems) return;

  const emptyText = document.getElementById("checkout-empty");
  const subtotalEl = document.getElementById("summary-subtotal");
  const deliveryEl = document.getElementById("summary-delivery");
  const totalEl = document.getElementById("summary-total");

  checkoutItems.innerHTML = "";

  if (!cart.length) {
    emptyText.innerText = "No items in cart. Please add products before checkout.";
    subtotalEl.innerText = "₹0";
    deliveryEl.innerText = "₹0";
    totalEl.innerText = "₹0";
    return;
  }

  if (emptyText) {
    emptyText.innerText = "";
  }

  cart.forEach((item) => {
    checkoutItems.innerHTML += `<div class="summary-row"><span>${item.name}</span><strong>₹${item.price}</strong></div>`;
  });

  const subtotal = getCartTotal();
  const delivery = subtotal >= 499 ? 0 : 49;
  const finalTotal = subtotal + delivery;

  subtotalEl.innerText = "₹" + subtotal;
  deliveryEl.innerText = "₹" + delivery;
  totalEl.innerText = "₹" + finalTotal;
}

function placeOrder(event) {
  event.preventDefault();

  if (!cart.length) {
    alert("Cart is empty. Please add items first.");
    return;
  }

  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  const order = {
    customerName: document.getElementById("full-name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    paymentMethod: selectedPayment ? selectedPayment.value : "UPI",
    items: cart,
    subtotal: getCartTotal(),
    timestamp: new Date().toISOString()
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  cart = [];
  saveCart();
  updateCartCount();

  alert("Order placed successfully! Thank you for shopping with SoFiss.");
  window.location.href = "index.html";
}

function searchProducts() {
  const input = document.getElementById("search");
  const productList = document.getElementById("product-list");
  if (!input || !productList) return;

  const filter = input.value.toLowerCase();
  const products = productList.getElementsByClassName("product");

  for (let i = 0; i < products.length; i++) {
    const productName = products[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
    products[i].style.display = productName.includes(filter) ? "block" : "none";
  }
}

updateCartCount();
if (document.getElementById("cart-items")) {
  displayCart();
}
if (document.getElementById("checkout-items")) {
  displayCheckoutSummary();
}
