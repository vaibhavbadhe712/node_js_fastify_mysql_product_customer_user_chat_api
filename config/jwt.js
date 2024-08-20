require('dotenv').config(); // Ensure this is at the top of the file

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

if (!SECRET_KEY || !REFRESH_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY or JWT_REFRESH_SECRET_KEY is not defined in environment variables');
}

const generateToken = (user) => {
    const accessToken = jwt.sign(
        { userId: user.userId, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' } // Access token valid for 1 hour
    );

    const refreshToken = jwt.sign(
        { userId: user.userId, username: user.username },
        REFRESH_SECRET_KEY,
        { expiresIn: '7d' } // Refresh token valid for 7 days
    );

    return { accessToken, refreshToken };
};

const verifyToken = (token, isRefresh = false) => {
    const secret = isRefresh ? REFRESH_SECRET_KEY : SECRET_KEY;
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
