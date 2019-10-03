const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../database/dao/User');

router.post('/login', async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await User.getUserByUsername(username);
        if (user) {
            const isRight = await bcrypt.compare(password, user.password);
            if (isRight) {
                const payload = {
                    id: user._id,
                    username,
                    notesCount: user.notesCount
                };
                const token = jwt.sign(JSON.stringify(payload), config.get('JWT.secret'));
                res.status(200).json({
                    status: 'Success',
                    token,
                    user: payload
                })
            } else {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Password is incorrect'
                })
            }
        } else {
            res.status(400).json({
                status: 'Failed',
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error.message
        })
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
        if (!user) {
            if (password === confirmation) {
                const salt = await bcrypt.genSalt(10);
                const encrypted = await bcrypt.hash(password, salt);
                const newUser = await User.addUser({
                    username,
                    password: encrypted
                });
                res.status(201).json({
                    status: 'Success',
                    data: newUser
                })
            } else {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Passwords don\'t match'
                })
            }
        } else {
            res.status(400).json({
                status: 'Failed',
                message: 'User already exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error.message
        })
    }
});

module.exports = router;