document.querySelectorAll(".product-card").forEach(card => {
    let quantityElem = card.querySelector(".quantity");
    let quantity = 1;

    card.querySelector(".plus-btn").addEventListener("click", () => {
        quantity++;
        quantityElem.textContent = quantity;
    });

    card.querySelector(".minus-btn").addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityElem.textContent = quantity;
        }
    });

    card.querySelector(".add-to-cart").addEventListener("click", () => {
        let id = card.getAttribute("data-id");
        let name = card.getAttribute("data-name");
        let price = parseInt(card.getAttribute("data-price"));
        let img = card.getAttribute("data-img");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ id, name, price, img, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
    });
});
