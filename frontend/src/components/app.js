let products = []; // array para almacenar los productos que llegan de las consultas 
let categories = []; // array para alamacenar las categorias que llegan del backend
let paginations = 0; // variable para almacenar el numero de paginas que se desplegaran en app 
let currentPage = 1; // variable para almacenar la pagina actual mostrada en el html
let currentProductShowed = 12; // variable para almacenar el numero de productos que se desplegaran en app
let typeOfSort = 'asc'; // varibale para almacenar el tipo de orden que se desea


// elementos html que interactuan dentro del componente app.
const HTMLResponse = document.querySelector('#app');
let orderByNameButton = document.querySelector('.order-by-names');  
let orderByPriceButton = document.querySelector('.order-by-prices');
let orderByCategories = document.querySelector('.order-by-categories');
let pagination = document.querySelector('.pagination');
const showEveryone = document.querySelector('.show-everyone');
let orderBy = document.querySelector('.order-by');


// funcion para renderizar los productos
const renderProducts = (html_response) => {
    
    setPagination();
    
    // si el numero de productos es menor a 12 se muestran todos los productos
    if(paginations == 1){
        currentPage = 1;
        if(currentProductShowed > products.length){
            currentProductShowed = products.length;
        }
    }
    if((currentProductShowed-1) > products.length){
        currentProductShowed = products.length;
    }

    // se genera el template de los productos
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
    let sort; 
    if(typeOfSort == 'desc'){
        sort = (a, b) => b.name.localeCompare(a.name);
    }else{
        sort = (a, b) => a.name.localeCompare(b.name);
    }
    products = products.sort(sort);
    renderProducts(HTMLResponse);
}

orderByPriceButton.onclick = () => {
    let sort; 
    if(typeOfSort == 'desc'){
        sort = (a, b) => b.price - a.price;
    }else{
        sort = (a, b) => a.price - b.price;
    }
    products = products.sort(sort);
    renderProducts(HTMLResponse);
}

orderByCategories.onchange = () => {
    const category_id = orderByCategories.value;
    const originalProducts = products;
    if (category_id != 0) {
        products = products.filter(product => product.category == category_id);
    }
    resetPagination();
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




const setTypeOfSort = (type) => {
    typeOfSort = type;
    console.log(typeOfSort);
}

orderBy.onclick = () => {
    orderBy.innerText = '';
    if(typeOfSort == 'asc'){
        setTypeOfSort('desc');
        orderBy.appendChild(document.createElement('span'));
        orderBy.lastElementChild.innerText = ': descendente';
    }else{
        setTypeOfSort('asc');
        orderBy.appendChild(document.createElement('span'));
        orderBy.lastElementChild.innerText = ': ascendente';
    }  
}

