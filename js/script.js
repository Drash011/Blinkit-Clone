//    CART

let cart = [];

const cartCounter =
    document.getElementById("cartCount");

const addCartButtons =
    document.querySelectorAll(".add-cart");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const item = {

            name: button.dataset.name,

            price: Number(button.dataset.price),

            image: button.dataset.image,

            qty: 1,

            weight: button.dataset.weight

        };

        const existingItem = cart.find(
            p => p.name === item.name
        );

        if (existingItem) {

            existingItem.qty++;

        }
        else {

            cart.push(item);

        }

        updateCart();

        showToast("Product added to cart");

    });

});


function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartItems.innerHTML += `

<div class="cart-item">

    <img src="${item.image}">

    <div class="cart-info">

        <h4>${item.name}</h4>

        <p>${item.weight || ""}</p>

        <strong>₹${item.price}</strong>

    </div>

    <div class="qty-box">

        <button onclick="decreaseQty(${index})">
            -
        </button>

        <span>${item.qty}</span>

        <button onclick="increaseQty(${index})">
            +
        </button>

    </div>

</div>

`;

    });

    let count = 0;

    cart.forEach(item => {

        count += item.qty;

    });

    cartCounter.textContent = count;

    cartTotal.textContent = total + 25 + 2;

    document.getElementById("itemsTotal")
        .textContent = "₹" + total;

    document.getElementById("grandTotal")
        .textContent = "₹" + (total + 25 + 2);

}

function increaseQty(index) {

    cart[index].qty++;

    updateCart();

}

function decreaseQty(index) {

    if (cart[index].qty > 1) {

        cart[index].qty--;

    }
    else {

        cart.splice(index, 1);

    }

    updateCart();

}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

    showToast("Item removed");

}

//    DARK MODE

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "dark");

    }
    else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "light");

    }

});

//    LOAD SAVED THEME
window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fas fa-sun"></i>';

    }

});

//    WISHLIST
const wishButtons =
    document.querySelectorAll(".wish-btn");

wishButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const icon =
            button.querySelector("i");

        if (button.classList.contains("active")) {

            icon.classList.remove("far");
            icon.classList.add("fas");

            showToast("Added to wishlist");

        }
        else {

            icon.classList.remove("fas");
            icon.classList.add("far");

            showToast("Removed from wishlist");

        }

    });

});

//    SEARCH FILTER
const searchInput =
    document.getElementById("searchInput");

const products =
    document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    products.forEach(product => {

        const title =
            product.querySelector("h3")
                .textContent
                .toLowerCase();

        if (title.includes(value)) {

            product.style.display = "block";

        }
        else {

            product.style.display = "none";

        }

    });

});

//    TOAST NOTIFICATION

function showToast(message) {

    let toast =
        document.querySelector(".toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

//    HERO BUTTON
const heroButton =
    document.querySelector(".hero button");

if (heroButton) {

    heroButton.addEventListener("click", () => {

        document.querySelector(".products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}

//    CATEGORY CLICK EFFECT
const categories =
    document.querySelectorAll(".category");

categories.forEach(category => {

    category.addEventListener("click", () => {

        showToast(
            category.textContent.trim()
            + " Selected"
        );

    });

});

//    SIMPLE PAGE LOADER
window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

//    PRODUCT ANIMATION
const productCards =
    document.querySelectorAll(".product-card");

productCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform =
        "translateY(30px)";

    setTimeout(() => {

        card.style.transition =
            "0.5s ease";

        card.style.opacity = "1";
        card.style.transform =
            "translateY(0)";

    }, index * 150);

});

//    CART SIDEBAR
const cartButton =
    document.querySelector(".cart-btn");

if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            cartSidebar.classList.add(
                "active");

            cartOverlay.classList.add(
                "active");

        });

}

function closeCart() {

    cartSidebar.classList.remove(
        "active");

    cartOverlay.classList.remove(
        "active");

}

document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );

cartOverlay.addEventListener(
    "click",
    closeCart
);

// Order Modal
const checkoutBtn =
    document.querySelector(".checkout-btn");

const orderModal =
    document.getElementById("orderModal");

const closeOrderModal =
    document.getElementById(
        "closeOrderModal"
    );

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty"
            );

            return;
        }

        orderModal.classList.add(
            "show"
        );

    }
);

closeOrderModal.addEventListener(
    "click",
    () => {

        orderModal.classList.remove(
            "show"
        );

        cart = [];

        updateCart();

        closeCart();

    }
);

// Slider 
function scrollProducts(id, amount){

    const slider =
    document.getElementById(id);

    if(!slider) return;

    slider.scrollBy({
        left: amount,
        behavior: "smooth"
    });

}