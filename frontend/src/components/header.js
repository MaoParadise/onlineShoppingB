// variables y funciones que se usan en el componente Header
import fetchData from '../utils/fetchData.js';
let productSearch = '';

// elementos html que interactuan dentro del componente app.
const search = document.querySelector('.search');
const searchButton = document.querySelector('.search-button');

search.addEventListener('keyup', (event) => {
        productSearch = event.target.value;
        // si el usuario presiona enter en el input, se ejecuta la funcion searchProduct
        if(event.keyCode === 13) {
            resetPagination(); 
            if(productSearch !== '') {
                searchProduct();
            }else{
                fetchData.getProducts(fetchData.API_URL, HTMLResponse);
                // resetea la paginacion para que no se muestre la paginacion de la pagina anterior
            }
        }
    }
);

// activala busqueda de productos al presionar el boton de busqueda
searchButton.onclick = () => {
    if(search.value !== '') {
        searchProduct();
    }else{
        fetchData.getProducts(fetchData.API_URL, HTMLResponse);
        resetPagination(); // resetea la paginacion para que no se muestre la paginacion de la pagina anterior
    }
}

// funcion que hace el llamado a la API para buscar los productos filtrados
const searchProduct = () => {
    fetchData.getProductsByName(fetchData.API_URL, HTMLResponse, productSearch);
}


