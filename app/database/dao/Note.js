const Note = require('../models/Note');

module.exports = {
    getNotes() {
        return Note.find({})
    },
    getNoteById(noteId) {
        return Note.findById(noteId);
    },
    deleteNote(noteId) {
        return Note.findByIdAndRemove(noteId);
    },
    addNote(note) {
        const newNote = new Note(note);
        return newNote.save();
    },
    updateNote(noteId, updatedNote) {
        console.log('hii');
        return Note.findByIdAndUpdate(noteId, updatedNote);
    }
};