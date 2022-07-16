const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const UsersModel = mongoose.model('Users');

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
    },
    get_info_user: async (req, res, next) => {
        try {
            let user = await UsersModel.findById(req.userId);

            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json('Usuário não existe!')
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    get_by_id_users: async (req, res, next) => {
        const id = req.params.userId;

    }
}
