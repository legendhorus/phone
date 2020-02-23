let jwt = require('jsonwebtoken');
let config = require('../config');

module.exports = function() {
    return function(req, res, next) {
        let token = req.body.token || req.query.token || req.headers ['access-token'] || req.header['x-access-token'] || req.header['Authorization'] || req.get('Authorization');
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(401).json({status: 401, success: false, message: 'Failed to authenticate'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).send({
                status: 401,
                success: false,
                message: 'No token provided.'
            })
        }
    }
}