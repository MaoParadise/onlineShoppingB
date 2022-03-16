import paginationComponent from "../components/pagination.js";
const fetchData = {}
const loading  = document.querySelector('.loading-stand');
const requestSetup = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "row" : initialRow, // numero de fila
        "pages" : pagesDisplayed, // numero de paginas
        "elementByPage" : currentProductShowed // numero de elementos por pagina
    }),
}
// fetchData.API_URL = 'https://bsalebackend-api.herokuapp.com/api/';
fetchData.API_URL = 'http://localhost:3500/api/';


// todo objeto json recibido desde el backend tiene un message, un status y un result
// que el status sea true indica que se ha realizado correctamente
// de otra forma favor de consultar el message adjunto para obtener una idea de donde se encuentra el error

// si el parametro category es igual a 0 implica que se buscan todos los productos independiente de su categoria
fetchData.getProducts = async (api_url, html_response, category) => {
    loading.classList.add('loading-screen');
    if(category == 0){
        return fetch(`${api_url}/products/byPages/` , requestSetup)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status){
                products = data.result.pages;
                totalProductsRequest = data.result.totalElements;
                paginations = data.result.totalPages;
                isMorePages = data.result.isMorePages;
                requestRespond = data.result;
                renderProductsWithPagination(html_response, 1);
                paginationComponent.setPagination();
            }else{
                console.log(data.message);
            }
            loading.classList.remove('loading-screen');
        })
    }else {
        return fetch(`${api_url}/products/byCategory/${category}`, requestSetup)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status){
                products = data.result.pages;
                totalProductsRequest = data.result.totalElements;
                paginations = data.result.totalPages;
                isMorePages = data.result.isMorePages;
                requestRespond = data.result;
                renderProductsWithPagination(html_response, 1);
                paginationComponent.setPagination();
            }else{
                console.log(data.message);
            }
            loading.classList.remove('loading-screen');
        })
    }
    
}

fetchData.getCategories = async (api_url) => {
    loading.classList.add('loading-screen');
    return fetch(`${api_url}/categories`)
    .then(response => response.json())
    .then(data => {
        if(data.status){
            categories = data.result;
            renderCategories();
        }else{
            console.log(data.message);
        }    
        loading.classList.remove('loading-screen');
    })
}

fetchData.getProductsByName = async (api_url, html_response, name) => {
    loading.classList.add('loading-screen');
    return fetch(`${api_url}/products/byName/${name}`, requestSetup)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status){
            requestRespond = data.result;
            products = data.result.pages;
            totalProductsRequest = data.result.totalElements;
            paginations = data.result.totalPages;
            isMorePages = data.result.isMorePages;
            renderProductsWithPagination(html_response, 1);
            paginationComponent.setPagination();
        }else{
            renderMessage(html_response, data.message, data.status);
            console.log(data.message);
        }
        loading.classList.remove('loading-screen');
    })
}


fetchData.setRequestSetup = (initialRow, pagesDisplayed, currentProductShowed) => {
    requestSetup.body = JSON.stringify({
        "row" : initialRow, // numero de fila
        "pages" : pagesDisplayed, // numero de paginas
        "elementByPage" : currentProductShowed // numero de elementos por pagina
    })
}

export default fetchData;