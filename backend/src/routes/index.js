const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        title: 'API REST Shopping Cart - NodeJS BSALE selection process 2022',
        version: '1.2.0',
        author: 'Carlos Pasten Bravo',
        message : 'to obtain the list of products, use the GET method and the url: /api/products',
        SWAGGER : 'https://bsalebackend-api.herokuapp.com/api/api-docs/'
    });
});

module.exports = router;