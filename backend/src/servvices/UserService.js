const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {

    async createUser({username, email, password, sex, picture}){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, email, password: hashedPassword, sex, picture});
        return await user.save();                    
    }

    async loginUser({ email, password }){
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.ACCES_TOKEN_SECRET, {expiresIn: '1h'});
        return {token, user};
    }

    async getUserById(userId){
        return await User.findById(userId);
    }

    async updateUser(userId, userData) {
        return await User.findByIdAndUpdate(userId, userData, {new:true});
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId)
    }

    async getAllUser(){
        return await User.find()
    }
    
}

module.exports = new UserService();