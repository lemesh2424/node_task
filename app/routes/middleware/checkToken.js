const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        jwt.verify(token, config.get('JWT.secret'), (err, decoded) => {
            if (err) {
                return res.json({
                    status: 'Failed',
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
        } else {
        return res.json({
            status: 'Failed',
            message: 'Auth token is not supplied'
        });
    }
}
