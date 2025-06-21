const Gym =require('../Modals/gym');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookie_token; // Assuming the token is stored in a cookie named 'token'
        if (!token) {
            return res.status(401).json({ error: 'No token, autherization denied' });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SecretKey); // Use your secret key from .env
        req.gym = await Gym.findById(decode.gym_id).select('-password'); // Find the gym by ID and exclude the password field
        next(); // Call next middleware if token is valid
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = auth;
// This middleware checks for a valid JWT token in the request cookies.