require('dotenv').config();//הפעלת פונקיצה של נוט אי אן וי
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRouter = require('./api/v1/routes/product');
const categoryRouter = require('./api/v1/routes/category');
const clientRouter = require('./api/v1/routes/client');
const userRouter = require('./api/v1/routes/user');
const mysql = require('mysql');
const session = require('express-session');
const privateKey = process.env.PRIVATE_KEY;
const MongoStore = require('connect-mongo');
const hbs = require('express-handlebars');
const multer=require('multer');


//הגדרת בסיס נתונים מונגו
let mongoUser = process.env.MONGO_USER;
let mongoPass = process.env.MONGO_PASS;
let mongoServer = process.env.MONGO_SERVER;
let mongoDbName = process.env.MONGO_DBNAME;//mongodb+srv://
const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/${mongoDbName}`;
mongoose.connect(mongoConnStr);
var DB = mongoose.connection;//חיבור 

app.set('view engine', 'hbs');//  הגדרת המנוע בתצוגה בו תשתמש המערכת סיומת הקבצים תיהיה כזו HBS
app.set('views', './api/v1/views');//הגדרה בה יהיה שמור התצוגות שלנו



app.engine('hbs', hbs.engine({
    allowProtoPropertiesByDefault:true,
    extname: 'hbs',
    partialsdirs: './api/v1/views/partials',
    layoutsdirs: './api/v1/views/layouts'
}));


app.use(session({
    secret: privateKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        path: '/',
        secure: false,
        maxAge: 1000 * 60 * 20
    },
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/`
    })
}));

//const upload=multer({dest:'./uploads/pics/'});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
    if(file.fieldname=='ProdPicName')
    cb(null,'./public/uploads/pics/');
    else if(file.fieldname=='profileVideo')
    cb(null,'./public/uploads/vod/');
    else
    cb(null,'./public/uploads/files/');
    },
    filename:(req,file,cb)=>{
    let filename= Math.floor( Math.random() * 100000);
    let fileExtension=file.originalname.split('.').pop();
    let fullName=filename+"." +fileExtension;
    if(file.fieldname=='ProdPicName')
    req.body.picName=fullName;
    cb(null,fullName);
    }
    
});
const upload=multer({
    storage:storage
})

//const upload=multer({dest:'./public/uploads/pics'});
const auth = require('./api/v1/middlewares/auth');
const authS = require('./api/v1/middlewares/authS');
app.head('/',(req,res)=>{
    res.status(200).send('up');
});
app.use(morgan('dev')); // הוספת השכבה דמורגן שמטפלת בתיעוד הבקדות בקונסול
app.use(cors());//הוספת שכבת הבייניפ שך קורס גישה ממקורות חיצוניים בפורמט אגקס
app.use(express.json());//שכבה המטפלת בפורמט גייסון
app.use(express.urlencoded({ extended: true }));//שכבה המטפלת בבקשות שנשלחו בפורמט יוארל אנקודד
app.use('/client', clientRouter);//הפנייה בקשות של client
app.use('/category', categoryRouter);//הפנייה בקשות של category 
app.use('/product',upload.single('ProdPicName'),productRouter);//הפנייה בקשות של product 
app.use('/user', userRouter);//הפנייה בקשות של users

app.all('*', (req, res) => {
    res.status(404).json({ msg: "not found 404" });
});

module.exports = app;

