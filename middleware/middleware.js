const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

 
const authorize = (roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            console.log('req.user.role: ', req.user.role);
            return res.status(403).json({message: "Forbidden: Access denied"})
        }
        next()
    }
}

module.exports = {authMiddleware, authorize};
