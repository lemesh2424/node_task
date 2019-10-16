const Note = require('../models/Note');

module.exports = {
    async getNotes(userId) {
        try {
            const notes = await Note.find({});
            const filteredNotes = notes.filter(note => {
                return note.userId.toString() === userId;
            });
            return Promise.resolve(filteredNotes);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getNoteById(noteId) {
        return Note.findById(noteId);
    },
    async deleteNote(noteId, userId) {
        const user = await User.getUserById(userId);
        await User.deleteNoteOfUser(userId, user.notesCount);
        return Note.findByIdAndRemove(noteId);
    },
    async addNote(note) {
        const user = await User.getUserById(userId);
        await User.addNoteToUser(userId, user.notesCount);
        const newNote = new Note(note);
        return newNote.save();
    },
    updateNote(noteId, updatedNote) {
        return Note.findByIdAndUpdate(noteId, updatedNote);
    }
};