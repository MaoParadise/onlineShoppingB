const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');


// Getter for all products

/**
     * @swagger
     * /api/products:
     *  get:
     *    description: Obtiene la lista de productos
     *    tags: [Products]
     *    responses:
     *      '200':
     *        description: Obtiene la lista de productos
     *      '500':
     *        description: Error al obtener la lista de productos
 */
router.get('/products', product.getProducts);

/**
   * @swagger
   * /api/categories:
   *   get:
   *     description: Obtiene la lista de categorias
   *     tags: [Categories]
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: Obtiene la lista de categorias
*/
router.get('/categories', product.getCategories);

/**
   * @swagger
   * /api/products/{name}:
   *   get:
   *     description: Obtiene un producto por su nombre
   *     tags: [Products]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: name
   *         type: string
   *     responses:
   *       200:
   *         description: Obtiene un producto por su nombre
*/
router.get('/products/:name', product.getProductByName);

/**
   * @swagger
   * /api/products/category/{categoryId}:
   *   get:
   *     description: Obtiene la lista de productos por su id de categoria
   *     tags: [Products]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: categoryId
   *         type: integer
   *     responses:
   *       200:
   *         description: Obtiene la lista de productos por su id de categoria.
   *       404:
   *         description: No se encontraron productos para la categoria
   *       500:
   *         description: Error al obtener la lista de productos por su id de categoria
*/
router.get('/products/category/:categoryId', product.getProductsByCategory);


module.exports = router;