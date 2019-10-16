const router = require('express').Router();
const User = require('../../database/dao/User');
const checkToken = require('../middleware/checkToken');
const responseTemplate = require('../responseTemplate');

router.get('/', checkToken, async (req, res) => {
    try {
        const users = await User.getUsers('_id username notesCount');
        return responseTemplate.successResponse(res, 200, users);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

router.get('/:id', checkToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getUserById(userId, '_id username notesCount');
        return responseTemplate.successResponse(res, 200, user);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

router.put('/:id', checkToken, async (req, res) => {
    try {
        const updatedUser = {
            ...req.body
        };
        const userId = req.params.id;
        const oldUser = await User.updateUser(userId, updatedUser);
        return responseTemplate.successResponse(res, 200, oldUser);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

router.delete('/:id', checkToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.deleteUser(userId);
        return responseTemplate.successResponse(res, 200, deletedUser);
    } catch (error) {
        return responseTemplate.errorResponse(res, 400, error.message);
    }
});

module.exports = router;