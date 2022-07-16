const jwt = require('jsonwebtoken');

module.exports = {
    verifyJWT: function (req, res, next)  {
        let token;
        authHeader = String(req.headers['authorization'] || '');

        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7, authHeader.length);
        }
        //const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'Token não informado.'
            })
        }

        jwt.verify(token, 'SECRET', function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    auth: false,
                    message: 'Falha na autenticação do token.'
                })
            }

            req.userId = decoded._id;
            next();
        })
    }
}
