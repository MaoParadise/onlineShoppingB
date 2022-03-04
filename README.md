# Ejercicio proceso de selección para BSALE

## EJEMPLO DESPLEGADO
el despliegue del frontend se encuentra actualmente en el dominio https://romantic-heisenberg-14b73f.netlify.app/ de netlify, el backend se encuentra en https://bsale-exercise.herokuapp.com/

## frontend

### sobre la estructura del front-end

está conformada en su raíz por index.html, **todos los recursos a excepción de los assets se encuentran en la carpeta /src**, el proyecto está escrito en su totalidad en **Vanilla Javascript**
sin hacer uso de librerias externas.

### sobre la carpeta /src

aquí se encuentra los estilos y la lógica del frontend, está dividida en la carpeta **/css** para los estilos de los componentes, en la carpeta **/components** donde se guarda la lógica de los distintos componentes que interactúan con el DOM y **/utils** carpeta donde existe código no necesariamente relacionado con los componentes pero necesario para las operación **_( llamadas a la API )_**  

./src  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/components  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/css  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/utils  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ index.js   **el index.js esta para inicializar y hacer el re-render cuando sea necesario**


### sobre la carpeta /assets

aquí se encuentra los recursos que no necesariamente implican lógica de programación como el favicon y las imágenes  

./assets  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/images    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;favicon.jpge   

  

   


## backend

### sobre la estructura del back-end
para su confección se usó **NodeJS** junto al framework de **Express**, está conformada en su raíz por los package.json y la carpeta **/src**


### sobre la carpeta /src


la lógica del backend se encuentra escrita en esta carpeta, esta divida en la carpeta **/controllers** para manejar los eventos de llamados de la API e **interactuar con la base de datos**, la carpeta **/routes** para almacenar las rutas permitas de la API _**cualquier otra ruta que se desee agregar en el futuro tiene que estar aquí**_ y en la raíz de la carpeta se encuentran **database.js** (quien conecta a la base de datos), **index.js** ( inicializa, configura y arranca el backend) y **keys** ( guarda la información de la base de datos con la que se interactuara )  

./src  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/controllers    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/routes    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.js    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index.js  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;keys.js 

## API del backend

vease en la carpeta documentations el apartado de useAPI.md que explica la estructura de la API del backend



