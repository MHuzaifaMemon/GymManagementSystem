// const Gym =require('../Modals/gym');
// const jwt = require('jsonwebtoken');

// const auth = async (req, res, next) => {
//     try {
//         const token = req.cookies.cookie_token; // Assuming the token is stored in a cookie named 'token'
//         if (!token) {
//             return res.status(401).json({ error: 'No token, autherization denied' });
//         }

//         // Verify the token
//         const decode = jwt.verify(token, process.env.JWT_SecretKey); // Use your secret key from .env
//         req.gym = await Gym.findById(decode.gym_id).select('-password'); // Find the gym by ID and exclude the password field
//         next(); // Call next middleware if token is valid
//     } catch (error) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// };

// module.exports = auth;
// // This middleware checks for a valid JWT token in the request cookies.

const Gym = require('../../Modals/gym');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        // Extract the token (remove "Bearer " prefix)
        // The token format is typically "Bearer YOUR_TOKEN_STRING"
        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            // This case might happen if 'Authorization' header is just 'Bearer '
            return res.status(401).json({ error: 'No token provided after Bearer' });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SecretKey); // Use your secret key from .env
        
        // Find the gym by ID and exclude the password field
        req.gym = await Gym.findById(decode.gym_id).select('-password'); 

        // If no gym found for the decoded ID, it's an invalid token/user
        if (!req.gym) {
            return res.status(401).json({ error: 'Invalid token: User not found' });
        }

        next(); // Call next middleware if token is valid and gym found
    } catch (error) {
        console.error("Auth middleware error:", error); // Log the actual error for debugging
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token signature or malformed token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        }
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = auth;