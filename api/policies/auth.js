

 const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
   
    try {
        const token =req.cookie.jwt
        // console.log(token);
        const verify = jwt.verify(token, sails.config.custom.JWT_Secret);
        // console.log(verify);
        if(verify){
            next();
        }
    } catch (error) {
    return res.status(401).json({
        message:"auth failed"
    })  
    }
}