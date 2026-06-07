const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const path = require('path');

app.use(express.static(path.join(__dirname, 'Public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Receive and broadcast messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Message for when a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});