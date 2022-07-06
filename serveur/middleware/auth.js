const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    console.log(req);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, config.jwtKey);
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

/* fonction toker
token: jwt.sign(
     { userId: user._id },
       'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
      )
*/