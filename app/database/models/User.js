const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notesCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('users', UserSchema);