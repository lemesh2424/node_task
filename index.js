const express = require('express');
const app = express();
const cors = require('cors');
const mongoConnection = require('./app/database/connection/mongoose');

const log = require('./app/routes/middleware/log');

const authRouter = require('./app/routes/api/auth');
const usersRouter = require('./app/routes/api/users');
const notesRouter = require('./app/routes/api/notes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter)

Promise.all([mongoConnection, app.listen(3000)])
    .then(() => {
        console.log(`Server listened on port 3000`);
        console.log(`Mongo connected on database`);
    });