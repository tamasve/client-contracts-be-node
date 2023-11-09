const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        Read: {
        type: Number,
        default: 7700
        }
    },
    requestToken: String
});

module.exports = mongoose.model('User', userSchema);