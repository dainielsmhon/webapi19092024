//const DBConn = require('../config/MySqlDb');//חיבור לקונקשן של בסיס נתונים מסוגmysql 
const productModel = require('../models/product');
module.exports = {
    getAllProduct: (req, res) => {
        //החזרת התצוכה בתוך המסגרת
        //product זה התצוגה 
        //MAINזה המסגרת  סוג של מאסר פייג
        let sql = "select * from  t_product";
        const DBConn = require('../config/Mysql');
        DBConn.query(sql, (error, results, fields) => {
            console.log(req.session);
            if (error)
                return res.status(500).json(error);
            return res.render('Product', { Product, layouts: 'main' });
        });
        

    },
    getProductById: (req, res) => {
        let sql = `select * from  t_product where pid = ${req.params.id}`
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    },


    addNewProduct: (req, res) => {
        console.log(req.body);
        productModel.insertMany([req.body]).then((prod)=>{
           return res.status(200).json(prod)
        });
    
        
    },
    updateProduct: (req, res) => {
        let prod = req.body;
        let sql = `update  t_product set pname='${prod.pname}',pdesc = '${prod.pdesc}' where pid =${req.params.id}`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    },


    // מחיקת קטגוריה לפי מזהה
    deleteProduct: (req, res) => {
        let cat = req.body;
        let sql = `delete from t_product  where pid =${req.params.id}`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    }

};   