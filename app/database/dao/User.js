const User = require('../models/User');

module.exports = {
    getUsers(fields = null) {
        return User.find({}, fields);
    },
    getUserByUsername(username) {
        return User.findOne({ username });
    },
    getUserById(userId, fields = null) {
        return User.findById(userId, fields);
    },
    deleteUser(userId) {
        return User.findByIdAndRemove(userId);
    },
    addUser(user) {
        const newUser = new User(user);
        return newUser.save();
    },
    updateUser(userId, updatedUser) {
        if ('password' in updatedUser) {
            return Error('If you want to change password. Use \'changePassword\' method instead');
        } 
        return User.findByIdAndUpdate(userId, updatedUser);
    },
    changePassword(userId, newPassword) {

    },
    addNoteToUser(userId, notesCount) {
        return User.findByIdAndUpdate(userId, { notesCount: notesCount + 1 })
    },
    deleteNoteOfUser(userId, notesCount) {
        return User.findByIdAndUpdate(userId, { notesCount: notesCount - 1})
    }
};