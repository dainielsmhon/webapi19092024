const bcrypt = require('bcrypt');
const DBConn = require('../config/MySqlDb');//חיבור לקונקשן של בסיס נתונים מסוגmysql 
const jwt = require('jsonwebtoken');
const PrivateKey = process.env.PRIVATE_KEY;
module.exports = {

    Register: (req, res) => {
        const { email, pass, fullname } = req.body;
        let Sql = `select *from t_users where email='${email}'`;
        DBConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            if (results.length > 0)
                return res.status(400).json({ msg: "User Already Exists" });

            Sql = "insert into t_users(email,pass,fullname) values";
            bcrypt.hash(pass, 10).then((hashPass) => {

                Sql = Sql + `('${email}','${hashPass}','${fullname}')`;//pass/hashPass?
                DBConn.query(Sql, function (error, results, fields) {
                    if (error)
                        return res.status(500).json(error);
                    return res.status(200).json(results);
                });
            }).catch((error) => {
                return res.status(500).json(error);
            });
        });

    },

    Login: (req, res) => {//התחברות
        const { email, pass } = req.body;
        let Sql = `select *from t_users where email='${email}'`;
        DBConn.query(Sql, function (error, results, fields) {
            if (error)//במידה והתרחשה שגיאה במערכת
                return res.status(500).json(error);
            if (results.length < 1)//במידה ולא קיים משתמש עם המייל
                return res.status(400).json({ msg: "user note existe" });
            //המשתמש קיים במערכת,כעת נבדוק האם הסיסמה תקינה
            let hashPass = results[0].pass;
            bcrypt.compare(pass, hashPass, (error, loginStatus) => {
                console.log("error" + error);
                if (!loginStatus)
                    return res.status(401).json({ msg: "user snd /or  pass are wrong" });
                const { email, fullname } = results[0];
                req.session.user = { email, fullname };
                console.log(req.session.user);
                return res.status(200).json({ user: results[0].email });
                // const token = jwt.sign({email,fullname},PrivateKey,{expiresIn:'1h'});
                // return res.status(200).json({user:results[0].email,token});
            });
        });
    }

};