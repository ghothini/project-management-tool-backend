const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: {type: String, required: true},
    id: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model('User',UserSchema)