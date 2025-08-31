const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { secret } = process.env; // Assuming the JWT secret is stored in an environment variable

const verifyToken = promisify(jwt.verify);

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = await verifyToken(token, secret);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;