const mongoose = require('mongoose');//חיבור לסיפרייה מונגוס
mongoose.pluralize(null);//ביטול פנייה לטבלאות בלשון רבים באהגלית באוספת האות אס באנגלית אוטומטית 
//הגדרת סכימה עבור האוסף של המוצרים
var categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cid: Number,
    cname: String,
    price: Number
});
module.exports = mongoose.model('Category', categorySchema)//יצירת החיבור לאוסף המוצרים

