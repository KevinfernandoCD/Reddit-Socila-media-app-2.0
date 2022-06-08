const jwt = require("jsonwebtoken");

const generateToken = (id) => {

    /*JWT.SIGN TAKES 3 THINGS THE ID,A SECRET AND HOW MUCH TIME IT TAKES TO EXPIRE THIS TOKEN*/

    return jwt.sign({id},"p&s_user_secrect_token",{expiresIn:"30d"})

}
module.exports = generateToken;