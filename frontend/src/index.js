/*
    la logica del sitio esta en los componentes js en la carpeta src/components
*/

import fetchData from './utils/fetchData.js';


// inicializacion de la pagina y renderizando en el DOM los componentes dinamicos
fetchData.getProducts(fetchData.API_URL, HTMLResponse);
fetchData.getCategories(fetchData.API_URL);
renderShoppingCart();
renderCategories();



