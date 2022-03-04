# API REST

al iniciar la pagina se muestra el siguiente objeto.

{  
    "title": "API REST Shopping Cart - NodeJS BSALE selection process 2021",  
    "version": "1.0.0",  
    "author": "Carlos Pasten Bravo",  
    "message": "to obtain the list of products, use the GET method and the url: /api/products"  
}

## END POINTS

### /api/products - GET - Obtiene la lista de productos
    parametros de salida: 
        {
            "message": String,
            "status" : boolean,
            "result" : Array[JSON]
        }
    /*
    - en caso de no encontrar productos el resultado sera un array vacio.
    */

### /api/products/:name - GET - Obtiene un producto por su nombre (necesario para el buscador del frontend)  
    parametros de salida: 
        {
            "message": String,
            "status" : boolean,
            "result" : Array[JSON] || error
        }
    /*
    -en caso de no encontrar productos el parametro result sera un array vacio.

    -en caso de error inesperado el parametro result sera el error resultante de la consulta
    */


### /api/products/category/:categoryId - GET - Obtiene la lista de productos por su id de categoria
    parametros de salida: 
        {
            "message": String,
            "status" : boolean,
            "result" : Array[JSON]
        }
    /*
    -en caso de no encontrar productos el parametro result sera un array vacio.

    -en caso de error inesperado el parametro result sera el error resultante de la consulta
    */

### /api/categories - GET - Obtiene la lista de categorias
    parametros de salida: 
        {
            "message": String,
            "status" : boolean,
            "result" : Array[JSON]
        }
    /*
    - en caso de no encontrar categorias el resultado sera un array vacio.
    */
