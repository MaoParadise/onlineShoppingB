
import fetchData from './utils/fetchData.js';


// start fetching data and render it
fetchData.getProducts(fetchData.API_URL, HTMLResponse);
fetchData.getCategories(fetchData.API_URL);
renderShoppingCart();
renderCategories();

// events
shoppingCartButton.onclick = ()  => {
    handleShoppingCartContainer();
}





