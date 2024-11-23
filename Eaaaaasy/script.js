// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedPaymentMethod = null;

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to the cart!`);
    updateCartCount();
}

// Update the cart count display in the header
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

// Function to load cart items from localStorage when on the cart page
function loadCart() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - RM${item.price}`;
        cartList.appendChild(listItem);
        total += item.price;
    });

    totalPrice.textContent = total;
}

// Function to select payment method
function selectPayment(method) {
    selectedPaymentMethod = method;
    alert(`Payment method selected: ${method.replace('-', ' ').toUpperCase()}`);
}

// Function to handle the checkout process
function checkout() {
    if (!selectedPaymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    const totalAmount = document.getElementById("total-price").textContent;
    alert(`Checking out with ${selectedPaymentMethod.toUpperCase()} for a total of RM${totalAmount}`);
    
    cart = [];
    localStorage.removeItem('cart');
    loadCart();
    updateCartCount();
}

// Load cart items and cart count when the page loads
if (document.getElementById("cart-list")) {
    loadCart();
}
if (document.getElementById("cart-count")) {
    updateCartCount();
}