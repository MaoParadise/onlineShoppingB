const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initializations 

const app = express();

// Settings 
const swaggerOptions = {
    swaggerDefinition: { 
        info: {
            title: "API REST Shopping Cart - NodeJS BSALE selection process 2022",
            description: "API REST Shopping Cart - NodeJS BSALE selection process 2022",
            version: "1.0.0",
            contact: {
                name: "Carlos Andrés Pastén Bravo",
                url: "https://github.com/MaoParadise",
                email: "carlos92.pastenbravo@gmail.com"
            },
            servers: ["http://localhost:3500"]
        }
    }, 
    apis : ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.set('port', process.env.PORT || 3500);
app.set('json spaces', 4);

// Middlewares
app.use(morgan('dev'));
app.use(cors());


app.use(require('./routes/index'));

app.use('/api/', require('./routes/productRoutes'));

// Starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});