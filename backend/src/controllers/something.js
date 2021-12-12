const pool = require('../database');

const productCtrl = {}


// SUCCESS : en caso de que todo salga bien, devuelve un json con la informacion de o los producto
// ERROR : para control de errores en la consulta, devuelve un json con un message especificando en que metodo se produjo el error
// y un status false que se debe de controlar en el front-end


productCtrl.getCategories = async (req, res) => {
    const rows = await pool.query(`SELECT * FROM category`);
    return res.json(rows);  
}

productCtrl.getProductByName = async (req, res) => {
    const { name } = req.params;
    const rows = await pool.query(`SELECT * FROM product WHERE name LIKE '%${name}%'`, (error) => {
        if(error) {
            return res.json(
                {
                    message: 'Something went wrong with the query on getProductByName',
                    status: false
                }
            );
        };
    });
    return res.json(rows);  
}

module.exports = productCtrl;