const mongoose=require('mongoose');//חיבור לסיפרייה מונגוס
mongoose.pluralize(null);//ביטול פנייה לטבלאות בלשון רבים באהגלית באוספת האות אס באנגלית אוטומטית 
//הגדרת סכימה עבור האוסף של המוצרים
var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pid: Number,
    pname: String,
    price: Number
});
module.exports=mongoose.model('Product', productSchema)//יצירת החיבור לאוסף המוצרים

