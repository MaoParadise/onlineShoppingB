const fetchData = {}


// todo objeto json recibido desde el backend tiene un message, un status y un result
// que el status sea true indica que se ha realizado correctamente
// de otra forma favor de consultar el message adjunto para obtener una idea de donde se encuentra el error


fetchData.getProducts = async (api_url, html_response) => {
    return fetch(`${api_url}/products`)
    .then(response => response.json())
    .then(data => {
        if(data.status){
            products = data.result;
            renderProducts(html_response);
        }else{
            console.log(data.message);
        }
    })
}

fetchData.getCategories = async (api_url) => {
    return fetch(`${api_url}/categories`)
    .then(response => response.json())
    .then(data => {
        if(data.status){
            categories = data.result;
            renderCategories();
        }else{
            console.log(data.message);
        }    
    })
}

fetchData.getProductsByName = async (api_url, html_response, name) => {
    return fetch(`${api_url}/products/${name}`)
    .then(response => response.json())
    .then(data => {
        if(data.status){
            products = data.result;
            renderProducts(html_response);
        }else{
            console.log(data.message);
        }
    })
}


export default fetchData;