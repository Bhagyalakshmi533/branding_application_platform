let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartTableBody = document.querySelector('#cart-table tbody');
const cartTotalElem = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

function formatRupees(num) {
  return '₹' + num.toLocaleString('en-IN');
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  cartTableBody.innerHTML = '';

  if (cart.length === 0) {
    cartTableBody.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
    cartTotalElem.textContent = '0';
    checkoutBtn.disabled = true;
    return;
  }

  let total = 0;
  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td><img src="${item.image}" alt="${item.name}" style="max-width:80px; border-radius:8px;" /></td>
      <td>${formatRupees(item.price)}</td>
      <td>
        <button class="qty-btn minus" data-index="${idx}">-</button>
        <input type="number" min="1" class="qty-input" data-index="${idx}" value="${item.quantity}" />
        <button class="qty-btn plus" data-index="${idx}">+</button>
      </td>
      <td>${formatRupees(itemTotal)}</td>
      <td><button class="remove-btn" data-index="${idx}">Remove</button></td>
    `;
    cartTableBody.appendChild(tr);
  });

  cartTotalElem.textContent = formatRupees(total);
  checkoutBtn.disabled = false;

  addListeners();
}

function addListeners() {
  document.querySelectorAll('.qty-btn.plus').forEach(btn => {
    btn.onclick = () => {
      const i = btn.dataset.index;
      cart[i].quantity++;
      saveCart();
      renderCart();
    };
  });

  document.querySelectorAll('.qty-btn.minus').forEach(btn => {
    btn.onclick = () => {
      const i = btn.dataset.index;
      if (cart[i].quantity > 1) {
        cart[i].quantity--;
        saveCart();
        renderCart();
      }
    };
  });

  document.querySelectorAll('.qty-input').forEach(input => {
    input.onchange = () => {
      const i = input.dataset.index;
      let val = parseInt(input.value);
      if (!val || val < 1) val = 1;
      cart[i].quantity = val;
      saveCart();
      renderCart();
    };
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = () => {
      const i = btn.dataset.index;
      cart.splice(i, 1);
      saveCart();
      renderCart();
    };
  });
}

function addToCart(name, price, image) {
  const existing = cart.findIndex(item => item.name === name);
  if (existing >= 0) {
    cart[existing].quantity++;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  saveCart();
  alert(`${name} added to cart`);
}

// Render cart on page load
window.onload = renderCart;
