const mongoose = require('mongoose');
const bcript = require('bcrypt');
const Util = require('util');

const hashAsync = Util.promisify(bcript.hash);
const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

schema.pre('save', async function(next) {
    if(!this.password || !this.isModified('password')){
        return next();
    }
    try {
        const hashedPassword = await hashAsync(this.password, 10);
        this.password = hashedPassword
    } catch (err) {
        next(err)
    }
});

schema.set('toJSON', {
    transform: (doc, ret, options) => ({
        _id: ret._id,
        email: ret.email,
        name: ret.name,
        role: ret.role
    })
});
const User = mongoose.model('User', schema);

module.exports = User;