import io from 'socket.io';

const createSocketConnection = (server) => {
    const socket = io(server,
        {
            origins: '*:*',
            path: '/api/clock/'
        });

    console.log('Socket connection opened.');

    setUpEventsHandlers(socket);
};

const setUpEventsHandlers = (socket) => {
    socket.on('connection', (client) => {
        console.log(`Client: "${client.conn.id}" connected.`);

        client.on('disconnect', (reason) => {
            console.log(`Client: "${client.conn.id}" disconnected, because "${reason}".`);
        });
    });

    setInterval(function () {
        socket.emit('message', new Date().getTime());
    }, 1000);
};

export default createSocketConnection;

