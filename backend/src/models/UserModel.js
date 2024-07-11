const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema ({
    username: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sex: {type: String, enum: ['Male', 'Female'], required: true },
    picture: {type: String, required: false},
    role: {type: String, default: 'user'}
})

const User = mongoose.model('User', UserSchema)
module.exports = User;