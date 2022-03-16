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
    let { row, pages, elementByPage } = req.body;
    let limit = elementByPage * pages;

    const rows = await pool.query(`SELECT * FROM product LIMIT ?, ?`,
    [row, limit],(err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error al obtener todos los productos en el metodo getProductsWithPagination',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            let result = [];
            for(let i = 0; i < pages; i++){
                result.push(rows.slice(i * elementByPage, (i + 1) * elementByPage));
            }
            const morePage = (result[result.length - 1].length < elementByPage) ? false : true;
            return res.status(200).json({
                message: 'success',
                status: true,
                result: {
                    pages : result,
                    totalPages : Math.ceil(rows.length / elementByPage),
                    totalElements : rows.length,
                    isMorePages : morePage,
                    previousRowValue : (row - rows.length > 0) ? row - limit : 0,
                    nextRowValue : (morePage)? row + rows.length : 0,
                    nextPage : (morePage)? result.length + 1 : 0,
                    previousPage : ((result.length - pages) - 1 > 0)? result.length - 1 : 0
                }   
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
    let { row, pages, elementByPage } = req.body;
    let limit = elementByPage * pages;
    // usar placeholder para evitar sql injection
    const rows = await pool.query(`SELECT * FROM product WHERE name LIKE CONCAT('%', ?, '%') LIMIT ?, ?`,
    [req.params.name, row, limit] , (err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error en la consulta de producto en metodo getProductByName',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            let result = [];
            for(let i = 0; i < pages; i++){
                result.push(rows.slice(i * elementByPage, (i + 1) * elementByPage));
            }

            const morePage = (result[result.length - 1].length < elementByPage) ? false : true;
            return res.status(200).json({ 
                message: 'success',
                status: true,
                result: {
                    pages : result,
                    totalPages : Math.ceil(rows.length / elementByPage),
                    totalElements : rows.length,
                    isMorePages : morePage,
                    previousRowValue : (row - rows.length > 0) ? row - limit : 0,
                    nextRowValue : (morePage)? row + rows.length : 0,
                    nextPage : (morePage)? result.length + 1 : 0,
                    previousPage : ((result.length - pages) - 1 > 0)? result.length - 1 : 0
                }  
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
    let { row, pages, elementByPage } = req.body;
    let limit = elementByPage * pages;
    const rows =
    await pool.query(`SELECT product.* FROM product
                        INNER JOIN category
                        ON product.category = category.id
                        WHERE product.category = ?
                        LIMIT ?, ?`,
    [req.params.categoryId, row, limit] , (err, rows) => {
        if(err) {
            return res.status(500).json({
                message: 'Error en la consulta de producto en metodo getProductsByCategory',
                status: false,
                result: err
            })
        }
        if(rows.length > 0){
            let result = [];
            for(let i = 0; i < pages; i++){
                result.push(rows.slice(i * elementByPage, (i + 1) * elementByPage));
            }
            const morePage = (result[result.length - 1].length < elementByPage) ? false : true;
            return res.status(200).json({
                message: 'success',
                status: true,
                result: {
                    pages : result,
                    totalPages : Math.ceil(rows.length / elementByPage),
                    totalElements : rows.length,
                    isMorePages : morePage,
                    previousRowValue : (row - rows.length > 0) ? row - limit : 0,
                    nextRowValue : (morePage)? row + rows.length : 0,
                    nextPage : (morePage)? result.length + 1 : 0,
                    previousPage : ((result.length - pages) - 1 > 0)? result.length - 1 : 0
                }  
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