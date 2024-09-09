function changeQuantity(button, delta) {
    const input = button.parentElement.querySelector('input[name="quantity"]');
    let quantity = parseInt(input.value);

    if (!isNaN(quantity)) {
        quantity += delta;
        if (quantity < 0) quantity = 0; // Tidak mengizinkan nilai negatif
        input.value = quantity;
    }
}

function togglePopup(popupId, nextPopupId = null) {
    const popup = document.getElementById(popupId);
    if (popup.classList.contains('show')) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
            if (nextPopupId) {
                togglePopup(nextPopupId);  // Only toggle the next popup if specified
            }
        }, 500); // Sesuaikan dengan durasi animasi fade-out
    } else {
        popup.style.display = 'flex';
        setTimeout(() => popup.classList.add('show'), 10);
    }
}

function submitCart() {
    const itemsList = document.getElementById('cart-items-list');
    const totalElement = document.getElementById('cart-total');
    itemsList.innerHTML = ''; // Kosongkan daftar produk sebelumnya
    totalElement.innerHTML = ''; // Kosongkan total harga sebelumnya
    
    let totalPrice = 0;
    
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const productName = item.querySelector('h3').textContent;
        const quantity = item.querySelector('input[name="quantity"]').value;
        const price = parseInt(item.getAttribute('data-price'));
        const image = item.getAttribute('data-image');
        
        if (quantity > 0) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item-popup');
            itemElement.innerHTML = `
                <img src="${image}" alt="${productName}">
                <div class="cart-item-popup-details">
                    <h4>${productName}</h4>
                    <p>Jumlah: ${quantity}</p>
                    <p>Harga per buah: Rp ${price.toLocaleString()}</p>
                    <p>Total Harga: Rp ${(price * quantity).toLocaleString()}</p>
                </div>
            `;
            itemsList.appendChild(itemElement);
            
            totalPrice += price * quantity;
        }
    });
    
    if (totalPrice > 0) {
        const totalElementHtml = `
            <p>Total Harga Keseluruhan: Rp ${totalPrice.toLocaleString()}</p>
            <button class="btn-checkout" onclick="togglePopup('cart-popup', 'checkout-popup')">Lanjutkan Pembayaran</button>
        `;
        totalElement.innerHTML = totalElementHtml;
    }
    
    togglePopup('cart-popup'); // Tampilkan popup keranjang
}