const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
    // retrieve the token from the header
    const token = req.header('x-auth-tokne');
    // if it isnt a token check
    if (!token){
        res.status(401).json({msg:'No token, auth denied'});
    }
    else{
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded.user;
            next();
            
        } catch (error) {
            res.status(401).json({msg:'token is not valid'});
        }

    }
  
}