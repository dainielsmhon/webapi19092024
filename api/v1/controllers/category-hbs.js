const DBConn = require('../config/MySqlDb');//חיבור לקונקשן של בסיס נתונים מסוגmysql 
module.exports = {
    getAllCategory: (req, res) => {
//החזרת התצוכה בתוך המסגרת
        //Category זה התצוגה 
        //MAINזה המסגרת  סוג של מאסר פייג
        let sql = "select * from  t_Category";
        const DBConn = require('../config/Mysql');
        DBConn.query(sql, (error, results, fields) => {
            console.log(req.session);
            if (error)
                return res.status(500).json(error);
            return res.render('Category', { Category, layouts: 'main' });
        });


    },

    getCategoryById: (req, res) => {
        let sql = `select * from t_category where cid = ${req.params.id}`
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    },

    addNewCategory: (req, res) => {
        let cat = req.body;
        let sql = `insert into t_category (cname) values ('${cat.cname}')`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    },
    // עדכון קטגוריה לפי מזהה
    updateCategory: (req, res) => {
        let cat = req.body;
        let sql = `update t_category set cname='${cat.cname}' where cid =${req.params.id}`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    },

    // מחיקת קטגוריה לפי מזהה
    deleteCategory: (req, res) => {
        let cat = req.body;
        let sql = `delete from t_category  where cid =${req.params.id}`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    }

};