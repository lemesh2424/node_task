const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../database/dao/User');
const responseTemplate = require('../responseTemplate');

router.post('/login', async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        const user = await User.getUserByUsername(username);
        if (!user) return responseTemplate.errorResponse(res, 400, 'User not found');

        const isRight = await bcrypt.compare(password, user.password);
        if (!isRight) return responseTemplate.errorResponse(res, 400, 'Password incorrect');

        const loginResponse = generateLoginResponse(user);
        return responseTemplate.successResponse(res, 200, loginResponse);
    } catch (error) {
        return responseTemplate.errorResponse(res, 500, error.message);
    }
});

router.post('/join', async (req, res) => {
    try {
        const {
            username,
            password,
            confirmation
        } = req.body;
        const user = await User.getUserByUsername(username);
        if (user) return responseTemplate.errorResponse(res, 400, 'User already exist');

        const hashedPassword = generateHashedPassword(password, confirmation);
        if (!hashedPassword) return responseTemplate.errorResponse(res, 400, "Passwords don't match");

        const newUser = await registerUser(username, hashedPassword);
        return responseTemplate.successResponse(res, 201, newUser);
    } catch (error) {
        return responseTemplate.errorResponse(res, 500, error.message);
    }
});

module.exports = router;

async function registerUser(username, password) {
    const newUser = await User.addUser({
        username,
        password: encrypted
    });
    return newUser;
}

function generateLoginResponse(user) {
    const payload = {
        id: user._id,
        username: user.username,
        notesCount: user.notesCount
    };
    const token = jwt.sign(JSON.stringify(payload), config.get('JWT.secret'));
    return {
        token,
        payload
    };
}

async function generateHashedPassword(password, confirmation) {
    if (password === confirmation) {
        const salt = await bcrypt.genSalt(10);
        const encrypted = await bcrypt.hash(password, salt);
        return encrypted;
    }
    return null;
}