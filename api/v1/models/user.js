const mongoose = require('mongoose');//חיבור לסיפרייה מונגוס
mongoose.pluralize(null);//ביטול פנייה לטבלאות בלשון רבים באהגלית באוספת האות אס באנגלית אוטומטית 
//הגדרת סכימה עבור האוסף של המוצרים
var UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uid: Number,
    emsil: String,
    pass: Number
});
module.exports = mongoose.model('user', userSchema)//יצירת החיבור לאוסף המוצרים

