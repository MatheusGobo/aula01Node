const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const passport = require('passport');

const UsersModel = mongoose.model('Users');

router.get('/', async (req, res, next) => {
    try {
        const users = await UsersModel.find();
        res.status(200).json({
            caunt: users.length,
            users: users.map(user => {
                return {
                    name: user.name,
                    username: user.username,
                    access: user.access,
                    _id: user._id,
                    request: {
                        type: "GET",
                        url: "https://localhost:3000/users/" + user._id
                    }
                }
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

});

router.get('/:userId', async (req, res, next) => {
    const id = req.params.userId;

    try {
        const user = await UsersModel.findOne({_id: id})

        res.status(200).json({
            message: 'Success',
            user: user,
            reqest: {                
                type: "GET",
                url: "https://localhost:3000/users/" + user._id
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/signup/', async (req, res, next) => {
    try {
        let user = new UsersModel({
            name: req.body.name,
            username: req.body.username,
            //password: Buffer.from(req.body.password).toString('base64'), // Desconverte Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')
            access: req.body.access
        });

        user.setPassword(req.body.password);

        await user.save();

        res.status(200).json({
            message: 'User criado com sucesso!',
            createdUser: {
                name: user.name,
                username: user.username,
                access: user.access,
                _id: user._id,
                request: {
                    type: "GET",
                    url: "https://localhost:3000/users/" + user._id
                }
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/login/', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Por Favor, preencha o usuário e a senha'});
    }
    
    passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }

            if (user) {
                return res.status(200).json({ token: user.generateJWT() });
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
});

router.delete('/:userId', async (req, res, next) => {
    const id = req.params.userId;
    try {
        let status = await UsersModel.deleteOne({ _id: id });

        res.status(200).json({
            message: 'Delete User',
            status: status
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

})

module.exports = router;