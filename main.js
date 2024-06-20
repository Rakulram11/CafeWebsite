let navbar = document.querySelector('.navbar')

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
}

let searchForm = document.querySelector('.search-form')

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cart.classList.remove('active');
}

const cart = document.querySelector('.cart-items-container')

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    // cart.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.close-btn').forEach(button => {
      button.addEventListener('click', () => {
        cart.classList.toggle('active');
      });
    });
  });
  

document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-item-list');
    const totalAmountElem = document.querySelector('.total-amount');
    const cartCountElem = document.querySelector('.cart-menu span');
    const cartBtn = document.querySelector('#cart-btn');
    const cartContainer = document.querySelector('.cart-items-container');

    let cart = [];
    let totalAmount = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            const itemPrice = parseFloat(event.target.getAttribute('data-price'));

            addItemToCart(itemName, itemPrice);
            updateCartDisplay();
        });
    });

    function addItemToCart(name, price) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        totalAmount += price;
        cartCountElem.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function removeItemFromCart(name) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity -= 1;
            totalAmount -= item.price;
            if (item.quantity === 0) {
                cart = cart.filter(cartItem => cartItem.name !== name);
            }
            cartCountElem.textContent = cart.reduce((total, item) => total + item.quantity, 0);
            updateCartDisplay();
        }
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity} x Rs-${item.price}</span>
                <div>
                    <button class="less-btn" data-name="${item.name}">-</button>
                    <button class="more-btn" data-name="${item.name}">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        totalAmountElem.textContent = `Rs-${totalAmount.toFixed(2)}`;

        const lessButtons = document.querySelectorAll('.less-btn');
        const moreButtons = document.querySelectorAll('.more-btn');

        lessButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemName = event.target.getAttribute('data-name');
                removeItemFromCart(itemName);
            });
        });

        moreButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemName = event.target.getAttribute('data-name');
                const item = cart.find(item => item.name === itemName);
                if (item) {
                    addItemToCart(item.name, item.price);
                    updateCartDisplay();
                }
            });
        });
    }
});








