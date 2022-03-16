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
   * /api/products/byPages:
   *   post:
   *     description: Obtiene un conjunto de Arrays de productos paginados
   *     tags: [Products]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         schema:
   *          type: object
   *          required:
   *          properties:
   *           row:
   *             type: integer
   *           pages:
   *             type: integer
   *           elementByPage:
   *             type: integer
   *     responses:
   *       200:
   *         description: Obtiene un producto por su nombre
*/
router.post('/products/byPages', product.getProductsWithPagination);

/**
   * @swagger
   * /api/products/byName/{name}:
   *   post:
   *     description: Obtiene un conjunto de Arrays de productos paginados por su nombre 
   *     tags: [Products]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: name
   *         type: string
   *       - in: body
   *         name: body
   *         schema:
   *          type: object
   *          required:
   *          properties:
   *           row:
   *             type: integer
   *           pages:
   *             type: integer
   *           elementByPage:
   *             type: integer
   *     responses:
   *       200:
   *         description: Obtiene un producto por su nombre
*/
router.post('/products/byName/:name', product.getProductByName);

/**
   * @swagger
   * /api/products/category/{categoryId}:
   *   post:
   *     description: Obtiene un conjunto de Arrays de productos paginados por su id de categoria
   *     tags: [Products]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: categoryId
   *         type: integer
   *       - in: body
   *         name: body
   *         schema:
   *          type: object
   *          required:
   *          properties:
   *           row:
   *             type: integer
   *           pages:
   *             type: integer
   *           elementByPage:
   *             type: integer
   *     responses:
   *       200:
   *         description: Obtiene la lista de productos por su id de categoria.
   *       404:
   *         description: No se encontraron productos para la categoria
   *       500:
   *         description: Error al obtener la lista de productos por su id de categoria
*/
router.post('/products/byCategory/:categoryId', product.getProductsByCategory);

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

module.exports = router;