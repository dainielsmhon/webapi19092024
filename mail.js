const nodemailer=require('nodemailer')
//הגדרת שרת שליחת דואר
let transporter = nodemailer.createTransport({
    port:465,//כתובת היציאה
    host:'smtp.gmail.com',//כתובת השרת
    secure:true,//האם מאובטח כן או לא
    auth:{//אובייקט אונטנטקציה באמצעות שם משתמש וסיסמה
        user:'danielsimhon931@gmail.com',
        pass:'ktqfjvnkrotqzjpg'
    }

});

const msg={
    sender:'danielsimhon931@gmail.com',
    to:'daniesim@pelephone.co.il',
    subject:'בדיקת שליחת המייל ',
    text:'זהו תוכן המייל למקרה אין תמיכה בקוד למייל',
    html:'<h1>תוכן מייל כותרת</h1><p>טקטס תוכן המייל</p>'

};
let ans=transporter.sendMail(msg);
console.log(ans);


