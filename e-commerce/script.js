let products = [
    { name: "Laptop", price: 50000 },
    { name: "Phone", price: 20000 },
    { name: "Headphones", price: 2000 },
    { name: "Shoes", price: 3000 }
];

let cart = [];

function displayProducts() {
    let list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach((p, index) => {
        list.innerHTML += `
            <div class="product">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(index) {
    cart.push(products[index]);
    document.getElementById("cartCount").innerText = cart.length;
}

function viewCart() {
    document.getElementById("cart").style.display = "block";
    let items = document.getElementById("cartItems");
    items.innerHTML = "";

    cart.forEach(item => {
        items.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
    });
}

function closeCart() {
    document.getElementById("cart").style.display = "none";
}

displayProducts();