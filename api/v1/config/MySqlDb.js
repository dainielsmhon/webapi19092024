const mysql = require('mysql');
//חיבור לבסיס mysql
var MySqlDb = mysql.createPool({
    connectionLimit: 100,
    database: "ecomdb",
    host: "localhost",
    port: 3306,
    user: "daniel2",
    password: "123"
});//יצירת חיבור לבסיס הנתונים עם מאגר קונקשנים מוגדר מראש
module.exports = MySqlDb;