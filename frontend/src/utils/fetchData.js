const fetchData = {}
const loading  = document.querySelector('.loading-stand');

fetchData.API_URL = 'https://bsale-exercise.herokuapp.com/api/';


// todo objeto json recibido desde el backend tiene un message, un status y un result
// que el status sea true indica que se ha realizado correctamente
// de otra forma favor de consultar el message adjunto para obtener una idea de donde se encuentra el error


fetchData.getProducts = async (api_url, html_response) => {
    loading.classList.add('loading-screen');
    return fetch(`${api_url}/products`)
    .then(response => response.json())
    .then(data => {
        if(data.status){
            products = data.result;
            renderProducts(html_response);;
        }else{
            console.log(data.message);
        }
        loading.classList.remove('loading-screen');
    })
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
    return fetch(`${api_url}/products/${name}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status){
            products = data.result;
            renderProducts(html_response);
        }else{
            console.log(data.message);
        }
        loading.classList.remove('loading-screen');
    })
}


export default fetchData;