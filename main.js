let navbar = document.querySelector('.navbar')

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form')

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container')

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () =>{
    const addToCartButton = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-menu span');
    const cartItemList = document.querySelector('.cart-item');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-menu');
    const cartItemsContainer = document.getElementById('.cart-items-container');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButton.forEach((button, index) =>{
        button.addEventListener('click', () => {
            const item ={
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,
            };

            const exisitingItem = cartItem.firstElementChild(
                (cartItem) => cartItem.name === item.name, 
            );
            if(exisitingItem) {
                exisitingItem.quantity++;
            }
            else{
                cartItem.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });

        function updateCartUI(){
            updateCartItemCount(cartItem.lenght);
            updateCartItemList();
            updateCartTotal();
        }

        function updateCartItemCount(count){
            cartItemCount.textContent = count;
        }
        
        function updateCartItemList() {
            cartItemList.innerHTML = '';
            cartItem.forEach((item, index)=>{
                const cartItem = document.createElement('div');
                cartItemCount.classList.add('cart-item', 'individual-cart-item');
                cartItem.innerHTML=`
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(
                    2,
                )}
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
                </span>
                `;

                cartItemList.append(cartItem);
            });

            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button)=>{
                button.addEventListener('click', (event)=>{
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);
                });
            });
        }

        function removeItemFromCart(index){
            const removeItem =cartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI();
        }

        function updateCartTotal(){
            cartTotal.textContent = `$${totalAmount,toFixed(2)}`;
        }

        cartIcon.addEventListener('click', ()=>{
            cartItemsContainer.classList.toggle('open');
        });

        const closeButton = document.querySelector('.cartItemsContainer-close');
        closeButton.addEventListener('click', ()=>{
            cartItemsContainer.classList.remove('open');
        });
    });
});