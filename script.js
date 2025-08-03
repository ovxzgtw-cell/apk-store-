let cart = [];

function loadProducts() {
  fetch('server.php?action=getProducts')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('product-list');
      container.innerHTML = '';
      data.forEach(p => {
        container.innerHTML += `
          <div class="product-card">
            <img src="assets/images/${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>${p.description}</p>
            <p><strong>Rp ${p.price}</strong></p>
            <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Tambah ke Keranjang</button>
          </div>`;
      });
    });
}

function addToCart(id, name, price) {
  cart.push({id, name, price});
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    container.innerHTML += `<div>${item.name} - Rp ${item.price}</div>`;
    total += item.price;
  });
  container.innerHTML += `<div><strong>Total: Rp ${total}</strong></div>`;
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  const msg = cart.map(c => `${c.name} (Rp ${c.price})`).join(', ');
  window.open(`https://wa.me/6283190425655?text=Halo,%20saya%20ingin%20pesan:%20${msg}`, '_blank');
});

loadProducts();