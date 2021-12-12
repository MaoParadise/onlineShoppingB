let products = []; // array para almacenar los productos que llegan de las consultas 
let categories = []; // array para alamacenar las categorias que llegan del backend
let paginations = 0; // variable para almacenar el numero de paginas que se desplegaran en app 
let currentPage = 1; // variable para almacenar la pagina actual mostrada en el html
let currentProductShowed = 12; // variable para almacenar el numero de productos que se desplegaran en app


// elementos html que interactuan dentro del componente app.
const HTMLResponse = document.querySelector('#app');
let orderByNameButton = document.querySelector('.order-by-names');  
let orderByPriceButton = document.querySelector('.order-by-prices');
let orderByCategories = document.querySelector('.order-by-categories');
let pagination = document.querySelector('.pagination');


// funcion para renderizar los productos
const renderProducts = (html_response) => {
    
    setPagination();
    // console.log(`page : `+currentPage + ` currentProductShowed : `+currentProductShowed);
    
    if(paginations == 1){
        currentPage = 1;
        if(currentProductShowed > products.length){
            currentProductShowed = products.length;
        }
    }
    if((currentProductShowed-1) > products.length){
        currentProductShowed = products.length;
    }

    // console.log(`index of the array start ` + (currentPage-1)*12 + ` index of the array end ` + (currentProductShowed-1));
    // console.log(products.slice((currentPage-1)*12, (currentProductShowed)));

    const template = (products.slice((currentPage-1)*12, (currentProductShowed))).map(product => {
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




// seccion de funciones para setear la paginacion 

const setPagination = () =>{
    pagination.innerHTML = '';
    if((products.length) / 12 > 1){
        paginations = Math.ceil((products.length) / 12);
        if(paginations > 1) {
            pagination.appendChild(document.createElement('button'));
            pagination.lastElementChild.classList.add('previous');
            pagination.lastElementChild.innerText = 'Anterior';
            pagination.lastElementChild.onclick = () => {
                setCurrentPageByNextOrPrevious('previous');
            }
        }
        for(let i = 1; i <= paginations; i++){ // for para crear los botones de paginacion
            let page = document.createElement('button');
            page.innerText = `${i}`;
            if(i == currentPage){
                page.classList.add('active-page');
            }
            page.addEventListener('click', () => {
                setCurrentPageByPageNumber(i);
            });
            pagination.appendChild(page);
        }
        if(paginations > 1) {
            pagination.appendChild(document.createElement('button'));
            pagination.lastElementChild.classList.add('next');
            pagination.lastElementChild.innerText = 'Siguiente';
            pagination.lastElementChild.onclick = () => {
                setCurrentPageByNextOrPrevious('next');
            }
        }
    }
}

// si por cualquier instancia la paginacion no ocurre bien siempre se puede usar esta funcion para resetear a la pagina 1
const resetPagination = () => { 
    currentPage = 1;
    currentProductShowed = 12;
}

const setCurrentPageByPageNumber = (page_number) => {
    currentPage = page_number;
    currentProductShowed = currentPage * 12;
    renderProducts(HTMLResponse);
}

const setCurrentPageByNextOrPrevious = (order) => {
    if(order == 'next' && currentPage < paginations){
        currentPage++;
    }
    if(order == 'previous' && currentPage > 1){
        currentPage--;
    }
    currentProductShowed = currentPage * 12;
    renderProducts(HTMLResponse);
}