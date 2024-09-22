require('dotenv').config();//הפעלת פונקיצה של נוט אי אן וי
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRouter = require('./api/v1/routes/product');
const categoryRouter = require('./api/v1/routes/category');
const clientRouter = require('./api/v1/routes/client');

//הגדרת בסיס נתונים מונגו
let mongoUser = process.env.MONGO_USER;
let mongoPass = process.env.MONGO_PASS;
let mongoServer = process.env.MONGO_SERVER;
let mongoDbName = process.env.MONGO_DBNAME;//mongodb+srv://
const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/${mongoDbName}`;
mongoose.connect(mongoConnStr);
var DB = mongoose.connection;//חיבור 

app.use(morgan('dev')); // הוספת השכבה דמורגן שמטפלת בתיעוד הבקדות בקונסול
app.use(cors());//הוספת שכבת הבייניפ שך קורס גישה ממקורות חיצוניים בפורמט אגקס
app.use(express.json());//שכבה המטפלת בפורמט גייסון
app.use(express.urlencoded({ extended: true }));//שכבה המטפלת בבקשות שנשךחו בפורמט יוארל אנקודד

app.use('/client', clientRouter);//הפנייה בקשות של client
app.use('/category', categoryRouter);//הפנייה בקשות של category 
app.use('/product', productRouter);//הפנייה בקשות של product 

app.all('*', (req, res) => {
    res.status(404).json({ msg: "not found 404" });
})

module.exports = app;

