const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http);
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

io.on('connection', (socket) => {
    socket.on('note add', (note) => {
        socket.broadcast.emit('note add', note.note);
    });
    socket.on('note edit', (note) => {
        socket.broadcast.emit('note edit', note);
    })
});

Promise.all([mongoConnection, http.listen(3000)])
    .then(() => {
        console.log(`Server listened on port 3000`);
        console.log(`Mongo connected on database`);
    });