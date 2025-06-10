const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);

// initiate socket.io and attch this to http server
const io = socketIo(server);

app.use(express.static('public'));

const users = new Set();
io.on("connection", (socket) => {
    console.log('A user is connected');

    // handle users when they join the chat
    socket.on('join', (userName) => {
        users.add(userName);
        socket.userName = userName;

        io.emit('userJoined', userName);

        io.emit('userList', Array.from(users));
    });

    // handle incoming chat messages
    socket.on('chatMessage', (message) => {
        // broadcast the message to all connected clients
        io.emit('chatMessage', message)
    })

    // handle user disconnection
    socket.on('disconnect', () => {
        console.log('An user has disconnected');

        users.forEach(user => {
            if(user === socket.userName) {
                users.delete(user);

                io.emit('userLeft', user);

                io.emit('userList', Array.from(users))
            }
        })
    })
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port${PORT}`);
})
