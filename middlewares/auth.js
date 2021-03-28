var jwt = require('jsonwebtoken');
const config = require("../config/keys.js");

 const auth = function (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.TOKEN_KEY, function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.email;
                console.log('Decoded email from auth ', decoded.email);
                next();
            }
        });
    } else {
        
        res.status(403).json('No token provided');
    };
}
module.exports = auth;