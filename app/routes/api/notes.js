const router = require('express').Router();
const Note = require('../../database/dao/Note');
const checkToken = require('../middleware/checkToken');
const responseTemplate = require('../responseTemplate');

router.get('/', checkToken, async (req, res) => {
    try {
        const loggedUserId = req.decoded.id;
        const notes = await Note.getNotes(loggedUserId);
        return responseTemplate.successResponse(res, 200, notes);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

router.get('/:id', checkToken, async (req, res) => {
    try {
        const noteId = req.params.id;
        const loggedUserId = req.decoded.id;
        await checkNoteAccess(res, noteId, loggedUserId);
        return responseTemplate.successResponse(res, 200, note);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const loggedUserId = req.decoded.id;
        const newNote = {
            ...req.body,
            userId: loggedUserId
        };
        const note = await Note.addNote(newNote);
        return responseTemplate.successResponse(res, 201, note);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

router.put('/:id', checkToken, async (req, res) => {
    try {
        console.log(req.body);
        const noteId = req.params.id;
        const loggedUserId = req.decoded.id;
        await checkNoteAccess(res, noteId, loggedUserId);
        const newNote = {
            ...req.body
        };
        const oldNote = await Note.updateNote(noteId, newNote);
        return responseTemplate.successResponse(res, 200, oldNote);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

router.delete('/:id', checkToken, async (req, res) => {
    try {
        const noteId = req.params.id;
        const loggedUserId = req.decoded.id;
        await checkNoteAccess(res, noteId, loggedUserId);
        const deletedNote = await Note.deleteNote(noteId);
        return responseTemplate.successResponse(res, 200, deletedNote);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

module.exports = router;

async function checkNoteAccess(res, noteId, userId) {
    const note = await Note.getNoteById(noteId);
    if (note.noteId !== userId) {
        return responseTemplate.errorResponse(res, 401, "You don't have access");
    }
}