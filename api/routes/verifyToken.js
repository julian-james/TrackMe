const jwt = require('jsonwebtoken');

// module.exports = function(req,res,next){
//     const token = req.header('auth-token');
//     if (!token) return res.status(401).send('Access Denied');

//     try {
//         const verified = jwt.verify(
//             token,
//             sdewr5t789oikljhgfert5678iu9ytre45e3qwedsfgvh
//             // process.env.TOKEN_SECRET
//             );
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send('Invalid Token');
//     }
// }

module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        next();  
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};