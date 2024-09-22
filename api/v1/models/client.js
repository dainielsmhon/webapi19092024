const mongoose = require('mongoose');//חיבור לספיירה מונגוס
mongoose.pluralize(null);//ביטול פנייה לטבלאות בלשון רבים באהגלית באוספת האות אס באנגלית אוטומטי
//הגדרת סכימה עבור האוסף client
var clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cid: Number,
    fname: String,
    lname: String
});
module.exports = mongoose.model('cilent', clientSchema)//יצירת חיבור לclient