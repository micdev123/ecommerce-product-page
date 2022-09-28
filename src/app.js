// Toggle Mobile navigation
const cart_container = document.querySelector('.cart_container')
const menu_item = document.querySelector('.menu_item');
const menu_icons = document.querySelectorAll('.menu_icons');
const overlay = document.querySelector('.overlay')


menu_icons.forEach((menu_icon) => {
    menu_icon.addEventListener('click', (e) => {
        const target_menu_icon = e.target
        console.log(target_menu_icon.id);
        if (target_menu_icon.id === 'menu_bar') {
            menu_item.classList.add('visible');
            overlay.style.display = "block";
        }
        else if (target_menu_icon.id === 'close_bar') {
            menu_item.classList.remove('visible')
            overlay.style.display = "none";
        }
        else {
            cart_container.classList.toggle('visible')
        }
    })
})


// Light Box Thumbnails
const btn_imgs = document.querySelectorAll('.img');
const img_light_box = document.querySelectorAll('.img_light_box')

const carouselImages = document.querySelector('.light_box_img');
const numberOfImages = document.querySelectorAll('.img').length;
const carousal_btns = document.querySelectorAll('.light_box_icon');

let imageIndex = 1;
let translateX = 0;

// console.log(numberOfImages);

btn_imgs.forEach((btn_img) => {
    btn_img.addEventListener('click', (e) => {
        const target_btn_img = e.target;
        const parent = target_btn_img.parentElement
        // console.log(parent);
        changeActiveImg(parent)
        img_light_box.forEach((target_img) => {
            if (target_img.classList.contains(parent.id)) {
                target_img.classList.add('active')
            }
            else {
                target_img.classList.remove('active')
            }
        })
    })
})

function changeActiveImg(parent) {
    for (const btn_img of btn_imgs) {
        btn_img.classList.remove('active')
    }
    parent.classList.add('active')
}


// Carousal
carousal_btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const target_btn = e.target.id
        console.log(target_btn);

        if (target_btn === 'previous') {
            if (imageIndex !== 1) {
                imageIndex--;
                translateX += 0;
            }
        }
        else {
            if (imageIndex !== numberOfImages) {
                imageIndex++;
                translateX -= 0;
            }
        }

        carouselImages.style.transform = `translateX(${translateX}px)`;
        img_light_box.forEach((image, index) => {
            if (index === imageIndex - 1) {
                image.classList.add('active');
            }
            else {
                image.classList.remove('active');
            }
        });
    })
})


// Add to cart
const add_item = document.querySelector('.add_item');
const title2 = document.querySelector('.title2');
const now_price = document.querySelector('.now_price');
const qty_btns = document.querySelectorAll('.qty_btn');
const qty_num = document.querySelector('.qty_num');
const cart_item = document.querySelector('.cart_item');
const product1 = "./images/image-product-1.jpg";
const in_carts = document.querySelectorAll('.incart');
const empty_cart = document.querySelector('.empty_cart')



qty_btns.forEach((qty_btn) => {
    let count = 0
    qty_btn.addEventListener('click', (e) => {
        const target_qty_btn = e.target.id;
        // console.log(target_qty_btn);
        if (target_qty_btn === 'plus') {
            qty_num.innerText = Number(qty_num.innerText) + 1;
        }
        else {
            if (Number(qty_num.innerText) > 0) {
                qty_num.innerText = Number(qty_num.innerText) - 1;
            }
        }
        // console.log(count);
    })
    
})


add_item.addEventListener('click', () => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];

    const data = {
        itemImg: product1,
        itemName: title2.innerHTML,
        itemPrice: Number(now_price.innerHTML),
        qty: Number(qty_num.innerText),
        total: Number(now_price.innerHTML) * Number(qty_num.innerText),
    }

    const in_storage = storedItems.filter((storedItem) => storedItem.itemName === data.itemName).length > 0;

    if (in_storage) {
        storedItems.map((storedItem) => storedItem.qty + data.qty)
    }
    else {
        storedItems.push(data);
    }

    // Save local storage
    localStorage.setItem('items', JSON.stringify(storedItems))

    in_carts.forEach((in_cart) => {
        in_cart.innerText = qty_num.innerText;
        in_cart.style.backgroundColor = '#ff7d1a'
    })
    

    displayCartItem()
})


function displayCartItem() {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];

    // cart_item.innerHTML = "";
    let item_inCart = storedItems.map((item, index) => {
        return `
        <div class="cart_item_container">
          <div class="item_img">
            <img src=${item.itemImg} alt="">
          </div>
          <div class="item_info">
            <p class="item_name">
              ${item.itemName}
            </p>
            <p class="item_price">
              $<span>${item.itemPrice}</span> x <span class="qty">${item.qty}</span> $<span class="total">${item.total}</span>
            </p>
          </div>
          <i class="fa-solid fa-trash trash" onClick="trash_item(${index})"></i>
        </div>
        `
    })

    item_inCart = item_inCart.join('');
    if (storedItems.length > 0) {
        cart_item.innerHTML = item_inCart;
        storedItems.map((item) => { 
            in_carts.forEach((in_cart) => {
                in_cart.innerText = item.qty;
                in_cart.style.backgroundColor = '#ff7d1a'
            })
        })
    }
    else {
        // cart_item.innerHTML = empty_cart
        in_carts.forEach((in_cart) => {
            in_cart.innerText = ''
            in_cart.style.backgroundColor = 'white'
        })
        
    }
     
}


function trash_item(index) {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    storedItems.splice(index, 1);
    // Save local storage
    localStorage.setItem('items', JSON.stringify(storedItems))

    in_carts.forEach((in_cart) => {
        in_cart.innerText = ''
        in_cart.style.backgroundColor = 'white'
    })
    cart_item.innerHTML = ''
    cart_item.appendChild(empty_cart)
    
    // displayCartItem()
}


displayCartItem()
