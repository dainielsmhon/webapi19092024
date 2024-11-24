module.exports = (req, res, next) => {
    try {
        console.log(req.session.user);
       if(req.session.user==undefined)
       {
        return res.status(500).json({ Msg: "Error Authenticating" });//הודעת שגיאה 
       }
        next();//מעבר לשכבה הבאה

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ Msg: "Error Authenticating" });//הודעת שגיאה 
    }
}