const router = require('express').Router();
const Note = require('../../database/dao/Note');
const User = require('../../database/dao/User');
const checkToken = require('../middleware/checkToken');

router.get('/', checkToken, async (req, res) => {
    try {
        const { id } = req.decoded;
        let notes = await Note.getNotes();
        notes = notes.filter(note => { 
            return note.userId.toString() === id;
         });
        res.status(200).json({
            status: 'Success',
            data: notes
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
});

router.get('/:id', checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.decoded.id;
        const note = await Note.getNoteById(id);
        if (note.id !== userId) {
            res.status(401).json({
                status: 'Failed',
                message: 'You don\'t have access'
            });
        }
        res.status(200).json({
            status: 'Success',
            data: note
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
});

router.post('/', checkToken, async (req, res) => {
    try {
        const { id } = req.decoded;
        if ('userId' in req.body) {
            const { userId  } = req.body;
            if (userId !== id) {
                res.status(401).json({
                    status: 'Failed',
                    message: 'You don\'t have access'
                });
            }
            const note = await Note.addNote(req.body);
            let user = await User.getUserById(userId);
            user = await User.addNoteToUser(userId, user.notesCount);
            res.status(201).json({
                status: 'Success',
                data: note
            });
        } else {
            const note = await Note.addNote(Object.assign(req.body, { userId: id }));
            let user = await User.getUserById(id);
            user = await User.addNoteToUser(id, user.notesCount);
            res.status(201).json({
                status: 'Success',
                data: note
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        });
    }
});

router.put('/:id', checkToken, async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;
        const userId = req.decoded.id;
        const note = await Note.getNoteById(id);
        if (note.userId.toString() !== userId) {
            res.status(401).json({
                status: 'Failed',
                message: 'You don\'t have access'
            })
        } else {
            const oldNote = await Note.updateNote(id, req.body);
            res.status(200).json({
                status: 'Success',
                data: oldNote
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        });
    }
});

router.delete('/:id', checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.decoded.id;
        const note = await Note.getNoteById(id);
        if (note.id !== userId) {
            res.status(401).json({
                status: 'Failed',
                message: 'You don\'t have access'
            })
        }
        const deletedNote = await Note.deleteNote(id);
        let user = await User.getUserById(userId);
        user = await User.deleteNoteOfUser(userId, user.notesCount);
        res.status(200).json({
            status: 'Success',
            data: deletedNote
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
});

module.exports = router;