let socket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('chat message', (msg) => io.emit('chat message', msg));
        socket.on('disconnect', () =>
            console.log('user disconnected'));
    });
};


module.exports = socket;