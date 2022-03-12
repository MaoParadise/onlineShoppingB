const pool = require('../database');

const productCtrl = {}

// SUCCESS : en caso de que todo salga bien, devuelve un json con la informacion de o los producto con un mensaje de success y un status true
// ERROR : para control de errores en la consulta, devuelve un json con un message especificando en que metodo se produjo el error
// y un status false que se debe de controlar en el front-end



productCtrl.getProducts = async ( req, res) =>{
    const rows =  await pool.query(`SELECT * FROM product`, (err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error al obtener todos los productos en el metodo getProducts',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            return res.status(200).json({
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.status(404).json({
                message: 'No se encontraron productos',
                status: false,
                result: []
            });
        };
    });
} 

productCtrl.getProductsWithPagination = async (req, res) => {
    let { page } = req.params;
    page = page - 1;
    let offset = 5 * page;
    const rows = await pool.query(`SELECT * FROM product LIMIT ${offset}, 5`, (err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error al obtener todos los productos en el metodo getProductsWithPagination',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            return res.status(200).json({
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.status(404).json({
                message: 'No se encontraron productos',
                status: false,
                result: []
            });
        }
    });
}

productCtrl.getCategories = async (req, res) => {
    const rows = await pool.query(`SELECT * FROM category`, (err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error al obtener las categorias en el metodo getCategories',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            return res.status(200).json({
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.status(404).json({
                message: 'No se encontraron las Categorias',
                status: false,
                result: []
            });
        };
    }); 
}

productCtrl.getProductByName = async (req, res) => {
    const { name } = req.params;
    // usar placeholder para evitar sql injection
    const rows = await pool.query(`SELECT * FROM product WHERE name LIKE CONCAT('%', ?, '%')`,
    [req.params.name] , (err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error en la consulta de producto en metodo getProductByName',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            return res.status(200).json({ 
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.status(404).json({
                message: 'No se encontraron productos',
                status: false,
                result: []
            });
        };
    });
}

productCtrl.getProductsByCategory = async (req, res) => {
    const rows =
    await pool.query(`SELECT product.* FROM product
                        INNER JOIN category
                        ON product.category = category.id
                        WHERE product.category = ?`,
    [req.params.categoryId] , (err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error en la consulta de producto en metodo getProductsByCategory',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            return res.status(200).json({ 
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.status(404).json({
                message: 'No se encontraron productos para la categoria',
                status: false,
                result: []
            });
        };
    });
}

module.exports = productCtrl;