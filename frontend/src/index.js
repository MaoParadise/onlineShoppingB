/*
    la logica del sitio esta en los componentes js en la carpeta src/components
*/

import fetchData from './utils/fetchData.js';
const search = document.querySelector('.search');
const title = document.querySelector('.title');

// inicializacion de la pagina y renderizando en el DOM los componentes dinamicos
fetchData.getProducts(fetchData.API_URL, HTMLResponse);
fetchData.getCategories(fetchData.API_URL);
renderShoppingCart();
renderCategories();


// la funcion showEveryone a diferencia de hacer un re-render manda una solicitud otra vez a la API
// para que se muestren todos los productos y luego hace un render de los componenetes quitando cualquier
// filtro que se haya aplicado

const reRender = () =>{
    search.value = '';
    resetPagination();
    fetchData.getProducts(fetchData.API_URL, HTMLResponse);
    fetchData.getCategories(fetchData.API_URL);
}

title.onclick  = () => reRender();
showEveryone.onclick = () => reRender();

