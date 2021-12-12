let products = []; // array para almacenar los productos que llegan de las consultas 
let categories = []; // array para alamacenar las categorias que llegan del backend

// elementos html que interactuan dentro del componente app.
const HTMLResponse = document.querySelector('#app');
let orderByNameButton = document.querySelector('.order-by-names');  
let orderByPriceButton = document.querySelector('.order-by-prices');
let orderByCategories = document.querySelector('.order-by-categories');


// funcion para renderizar los productos
const renderProducts = (html_response) => {
    const template = products.map(product => {
        return `
            <div class="product">
                <div class="image">
                    ${(product.discount > 0)
                        ? ` <div class="discount">
                                <i class="fas fa-certificate"></i>
                                <span> ${product.discount}% </span>
                            </div>`
                        : ''}
                    <img src="${(product.url_image)?product.url_image : defaultImage }" alt="${product.name}">
                </div>
                <div class="description">
                    <h4>${product.name}</h4>
                    <p>$.-${product.price}</p>
                    <button
                        class="add-to-cart"
                        onclick='addItem(${JSON.stringify(product)})'
                    >
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button
                        class="buy"
                        onclick='buyNow(${JSON.stringify(product)})'
                    > 
                        <i class="fas fa-money-bill"></i>
                    </button>
                </div>
            </div>
        `
    });
    html_response.innerHTML = template;
}

// funcion para renderizar las categorias
const renderCategories = () => {
    categories = categories.sort((a, b) => a.name.localeCompare(b.name));
    const template = `<option value="0"> categorías </option>` + categories.map(category => {
        return `
                <option value="${category.id}">${category.name}</option>
                `
    });
    orderByCategories.innerHTML = template;
}

orderByNameButton.onclick = () => {
    products = products.sort((a, b) => a.name.localeCompare(b.name));
    renderProducts(HTMLResponse);
}

orderByPriceButton.onclick = () => {
    products = products.sort((a, b) => a.price - b.price);
    renderProducts(HTMLResponse);
}

orderByCategories.onchange = () => {
    const category_id = orderByCategories.value;
    const originalProducts = products;
    if (category_id != 0) {
        products = products.filter(product => product.category == category_id);
    }
    renderProducts(HTMLResponse);
    products = originalProducts;
}
