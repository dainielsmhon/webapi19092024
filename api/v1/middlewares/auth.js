const jwt = require('jsonwebtoken');
const PrivateKey = process.env.PRIVATE_KEY;
module.exports = (req, res, next) => {
    try {
        const authStr = req.headers.authorization;//שליפה של ההדר של ההבטחה
        const Arr = headers.split(' ');//פיצול המחרוזת לפי תו רווח
        const token = Arr[1];//שליפת הטוקן לפי התו השני
        const userObj = jwt.verify(token, PrivateKey);//אימות הטוקן מול המערכת שהצפינה
        //req.token = token;//יצירת שדה בבקשה עם פרטי הטוקן
        req.email=userObj.email;//שמירת המזזה של הלקוח כשדה לבקשה
        next();//מעבר לשכבה הבאה

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ Msg: "Error Authenticating" });//הודעת שגיאה 
    }
}