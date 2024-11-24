const DBConn = require('../config/MySqlDb');//חיבור לקונקשן של בסיס נתונים מסוגmysql 
module.exports = {

    getAllClient: (req, res) => {
        //החזרת התצוכה בתוך המסגרת
        //Client זה התצוגה 
        //MAINזה המסגרת  סוג של מאסר פייג
        let sql = "select * from  t_Client";
        const DBConn = require('../config/Mysql');
        DBConn.query(sql, (error, results, fields) => {
            console.log(req.session);
            if (error)
                return res.status(500).json(error);
            return res.render('Client', { Client, layouts: 'main' });
        });

    },

    getClientById: (req, res) => {
        let sql = `SELECT * FROM t_client WHERE cid = ?`; // שימוש בפרמטר מאובטח
        DBConn.query(sql, [req.params.id], (error, results, fields) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.status(200).json(results);
        });
    },

    addNewClient: (req, res) => {
        let clien = req.body;
        let sql = `insert into  t_client(fname,lname) values ('${clien.fname}','${clien.lname}')`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    },
    updateClient: (req, res) => {
        let clien = req.body;
        let sql = `update  t_client set fname='${clien.fname}',lname = '${clien.lname}' where cid =${req.params.id}`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    },

    // מחיקת קטגוריה לפי מזהה
    deleteClient: (req, res) => {
        let cat = req.body;
        let sql = `delete from t_client  where cid =${req.params.id}`;
        DBConn.query(sql, (error, results, fields) => {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
        });
    }
};