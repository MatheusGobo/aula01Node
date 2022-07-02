const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema(
    {
        name:     {type: String, required: true},
        username: {type: String, required: true, lowercase: true, unique: true},
        hash:     {type: String},
        salt:     {type: String},
        access:   {type: String}
    },
    {
        timestamps: true
    }
);

usersSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
}

usersSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

    return this.hash === hash;
}

usersSchema.methods.generateJWT = function () {
    let exp = new Date();
    exp.setDate(new Date().getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, 'SECRET');
}

mongoose.model('Users', usersSchema);