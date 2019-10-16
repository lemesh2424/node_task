const jwt = require('jsonwebtoken');
const config = require('config');
const responseTemplate = require('../responseTemplate');

const tokenTypeLength = 7;

module.exports = (req, res, next) => {
    const token = getToken(req);
    if (!token) return responseTemplate.errorResponse(res, 400, 'Auth token is not supplied');
    jwt.verify(token, config.get('JWT.secret'), (err, decoded) => {
        if (err) {
            return responseTemplate.errorResponse(res, 400, 'Token is not valid');
        } else {
            req.decoded = decoded;
            next();
        }
    });
};

function getToken(req) {
    const token = req.headers['authorization'];
    if (!token) return null;
    if (token.startsWith('Bearer ')) {
        return token.slice(tokenTypeLength);
    }
    return token;
}