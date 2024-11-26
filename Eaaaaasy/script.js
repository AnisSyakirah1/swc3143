// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: parseFloat(productPrice) }); // Ensure price is parsed as a number
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to the cart!`);
    updateCartCount();
}

// Function to update the cart count display in the header
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Function to load cart items from localStorage when on the cart page
function loadCart() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");

    if (!cartList || !totalPrice) return; // Exit if elements are not found

    cartList.innerHTML = ""; // Clear existing cart items
    let total = 0;

    cart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - RM${item.price.toFixed(2)}`;
        cartList.appendChild(listItem);
        total += item.price; // Accumulate total price
    });

    totalPrice.textContent = `RM${total.toFixed(2)}`; // Update total in the cart
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Show confirmation
    alert("Checkout successful! Thank you for your purchase.");

    // Clear cart data
    cart = [];
    localStorage.removeItem("cart");

    // Update cart display
    loadCart();
    updateCartCount();
}

// Function to toggle payment form visibility
function togglePayment(option) {
    // Hide all payment form containers
    document.querySelectorAll(".form-container").forEach((container) => {
        container.style.display = "none";
    });

    // Show the selected payment method form
    if (option === "credit-card") {
        const selectedForm = document.getElementById(`${option}-form`);
        if (selectedForm) selectedForm.style.display = "block";
    } else if (option === "atome") {
        // Redirect to Atome directly
        window.open("https://www.atome.my", "_blank"); // Replace with Atome's actual URL
    } else if (option === "maybank") {
        // Redirect to Maybank2U directly
        window.open("https://www.maybank2u.com.my", "_blank"); // Replace with Maybank2U's actual URL
    }
}

// Function to handle Credit Card payment submission
function submitCreditCard(event) {
    event.preventDefault();
    alert("Credit Card Payment Submitted!");
    resetCart(); // Reset cart after payment
}

// Function to reset the cart after payment
function resetCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();

    // Clear cart list and total if on cart page
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    if (cartList) cartList.innerHTML = "";
    if (totalPrice) totalPrice.textContent = "RM0.00";
}

// On page load, ensure the cart count and items are updated
window.onload = () => {
    updateCartCount();
    loadCart(); // Load the cart if on the cart page
};
