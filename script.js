let navbar = document.querySelector('.header .navbar');
let menu = document.querySelector('#menu-btn');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let cart = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.add('active');
}

document.querySelector('#close-form').onclick = () =>{
    cart.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    loop:true,
    cnteredSlides:true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let cartItems = [];

document.querySelectorAll('.product .box-container .box .content .btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        let product = btn.parentElement.parentElement;
        let name = product.querySelector('.content h3').textContent;
        let price = product.querySelector('.content .price').textContent;
        let image = product.querySelector('.image img').src;

        let item = {
            name,
            price,
            image,
        };

        cartItems.push(item);
        updateCart();
    });
});

function updateCart() {
    let cartHtml = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        cartHtml += `
            <div class="cart-item">
                <img src="${item.image}" alt="">
                <div class="content">
                    <h2>${item.name}</h2>
                    <div class="price">${item.price}</div>
                </div>
                <button class="remove-btn" data-index="${index}"><b>remove</b></button>
            </div>
        `;

        total += parseFloat(item.price.replace('$', ''));
    });

    document.querySelector('.cart-items').innerHTML = cartHtml;
    document.querySelector('#total').textContent = total.toFixed(2);

    document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            let index = btn.dataset.index;
            cartItems.splice(index, 1);
            updateCart();
        });
    });
}

document.querySelector('#proceed-btn').addEventListener('click', () => {
    // Proceed to checkout logic here
    console.log('Proceed to checkout');
});