const router = require('express').Router();
const User = require('../../database/dao/User');
const checkToken = require('../middleware/checkToken');
const Note = require('../../database/dao/Note');

router.get('/', checkToken, async (req, res) => {
    try {
        let users = await User.getUsers('_id username notesCount');
        res.status(200).json({
            status: 'Success',
            data: users
        });
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
        const user = await User.getUserById(id, '_id username notesCount');
        res.status(200).json({
            status: 'Success',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
});

router.put('/:id', checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        const oldUser = await User.updateUser(id, req.body);
        res.status(200).json({
            status: 'Success',
            data: oldUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
});

router.delete('/:id', checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.deleteUser(id);
        res.status(200).json({
            status: 'Success',
            data: deletedUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
});

module.exports = router;