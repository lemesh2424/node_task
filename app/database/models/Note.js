const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const NoteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NoteSchema);