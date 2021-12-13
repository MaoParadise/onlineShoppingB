let shoppingCartArray = [];
let shoppingCartState = false;

const htmlCartCounter = document.querySelector('.cart-count');
const shoppingCartContainer = document.querySelector('.shopping-cart-container');
const shoppingCartBody = document.querySelector('.shopping-cart-body');
const shoppingCartTotalPrice = document.querySelector('.total-price');
const defaultImage = 'https://romantic-heisenberg-14b73f.netlify.app/images/default_product.png';

const shoppingCartButton = document.querySelector('.shopping-cart');


const renderShoppingCart = () => {
    deployCart(shoppingCartArray, shoppingCartBody);
    setCartCounter();
    setTotalPrice();
}

const setCartCounter = () => {

    if(shoppingCartArray.length > 0){
        htmlCartCounter.innerHTML = shoppingCartArray.length;
        htmlCartCounter.style.display = 'block';
    }else{
        htmlCartCounter.style.display = 'none';
    }
}

const setTotalPrice = () => {
    shoppingCartTotalPrice.innerHTML = `Total: $ ` + shoppingCartArray.reduce((total, item) => {
        return  total + item.price * item.quantity;
    }   , 0);
}

const addItem = (item) => {

    shoppingCartArray.some(cartItem => {
        if (cartItem.id === item.id) {
            cartItem.quantity += 1;
        }
    });

    if(!shoppingCartArray.some(cartItem => cartItem.id === item.id)){
        shoppingCartArray.push({
            id: item.id,
            url_image: item.url_image,
            name: item.name,
            price: item.price,
            category: item.category,
            quantity: 1
        }); 
    }

    renderShoppingCart();
}

const removeItem = (id) => {
    shoppingCartArray.some((cartItem, index) => {
        if (cartItem.id === id) {
            shoppingCartArray.splice(index, 1);
        }
    });

    renderShoppingCart();    

}

const updateQuantity = (input, id) => {
    const quantity = input.value;
    shoppingCartArray.some((cartItem) => {
        if (cartItem.id === id) {
            if(quantity > 0){
                cartItem.quantity = Number(input.value);
            }else{
                cartItem.quantity = 1;
            }
        }
    });

    renderShoppingCart();
    
}


const deployCart = (shopping, html_response) => {
    const template =  shopping.map(item => {
        return (`
            <div class="product-cart">
                <div class="quantity-product-cart">
                    <input
                    type="number"
                    class="plus-product"
                    onchange="updateQuantity(this, ${item.id})"
                    value="${item.quantity}">
                </div>
                <div class="description-product-cart">
                  <img src=${(item.url_image)?item.url_image : defaultImage } alt="${item.name}">  
                </div>
                <div class="options-product-cart" onclick='removeItem(${item.id})'>
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>`);
    })
    html_response.innerHTML = template;
}


const handleShoppingCartContainer = (item) =>{

    if(item){
        addItem(item);
    }

    if(!shoppingCartState) {
        shoppingCartContainer.classList.add('open');
        shoppingCartState = !shoppingCartState;
    }else{
        shoppingCartContainer.classList.remove('open');
        shoppingCartState = !shoppingCartState;
    }
}


const buyNow = (item) => {
    shoppingCartContainer.scrollIntoView({behavior: "smooth"});
    handleShoppingCartContainer(item);
}

shoppingCartButton.onclick = ()  => {
    handleShoppingCartContainer();
}