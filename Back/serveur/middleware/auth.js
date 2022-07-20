const jwt = require("jsonwebtoken");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    console.log(req);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        console.log(req);
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};