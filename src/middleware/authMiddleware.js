// src/middleware/auth.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Allow token from header or query string
    const token = req.headers['authorization']?.split(' ')[1] || req.query.token;

    if (!token) return res.status(403).send('Access Denied: No Token Provided');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
}

module.exports = verifyToken;
