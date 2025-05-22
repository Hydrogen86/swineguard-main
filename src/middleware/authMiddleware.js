
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Check Authorization header Bearer token first
  let token = req.headers['authorization']?.split(' ')[1];
  
  // If no token in header, check query parameter
  if (!token) {
    token = req.query.token;
  }

  // If still no token, check cookie
  if (!token && req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(403).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Contains userId and role
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
}

module.exports = verifyToken;
