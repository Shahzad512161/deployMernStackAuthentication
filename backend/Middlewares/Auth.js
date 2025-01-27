const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Corrected way to access headers

    // Check if the Authorization header is provided
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized, JWT token required" });
    }

    // Extract the token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token data to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Oops, JWT token is invalid" });
    }
};

module.exports = ensureAuthenticated;
