# Ejercicio proceso de seleccion para BSALE

## frontend

### sobre la estructura del front-end

esta conformada en su raiz por index.html, **todos los recursos a expecion de los assets se encuentr en la carpeta /src**, el proyecto esta escrito en su totalidad en **Vanilla Javascript**
sin hacer use de librerias externas.

### sobre al carpeta /src

aqui se encuentra los estilos y la logica del frontend, esta dividida en la carpeta **/css** para los estilos de los componentes, en la carpeta **/components** donde se guarda la logica de los distintos componentes que interactuan con el DOM y **/utils** carpeta donde existe codigo no necesariamente relacionado a los componentes pero necesario para las operacion **_( llamadas a la API )_**

-________/src
        -_________/components
        -_________/css
        -_________/utils
        -_________/ index.js  **el index.js esta para inicializar y hacer el re-render cuando sea necesario**