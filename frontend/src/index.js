
import fetchData from './utils/fetchData.js';


const API_URL = 'http://localhost:3500/api/';


// start fetching data and render it
fetchData.getProducts(API_URL, HTMLResponse);
fetchData.getCategories(API_URL);
renderShoppingCart();
renderCategories();

// events
shoppingCartButton.onclick = ()  => {
    handleShoppingCartContainer();
}





