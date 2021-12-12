const pool = require('../database');

const productCtrl = {}

// SUCCESS : en caso de que todo salga bien, devuelve un json con la informacion de o los producto con un mensaje de success y un status true
// ERROR : para control de errores en la consulta, devuelve un json con un message especificando en que metodo se produjo el error
// y un status false que se debe de controlar en el front-end



productCtrl.getProducts = async ( req, res) =>{
    const rows =  await pool.query(`SELECT * FROM product`, (err, rows) => {
        if(err) {
            return res.json({
                message: 'Error al obtener todos los productos en el metodo getProducts',
                status: false
            })
        }
        if(rows.length > 0){
            return res.json({
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.json({
                message: 'No se encontraron productos',
                status: false,
                result: []
            });
        };
    });
}

productCtrl.getCategories = async (req, res) => {
    const rows = await pool.query(`SELECT * FROM category`, (err, rows) => {
        if(err) {
            return res.json({
                message: 'Error al obtener las categorias en el metodo getCategories',
                status: false
            })
        }
        if(rows.length > 0){
            return res.json({
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.json({
                message: 'No se encontraron productos',
                status: false,
                result: []
            });
        };
    }); 
}

productCtrl.getProductByName = async (req, res) => {
    const { name } = req.params;
    const rows = await pool.query(`SELECT * FROM product WHERE name LIKE '%${name}%'`, (err, rows) => {
        if(err) {
            return res.json({
                message: 'Error en la consulta de producto en metodo getProductByName',
                status: false
            })
        }
        if(rows.length > 0){
            return res.json({
                message: 'success',
                status: true,
                result: rows
            });
        }else{
            return res.json({
                message: 'No se encontraron productos',
                status: false,
                result: []
            });
        };
    });
}

module.exports = productCtrl;