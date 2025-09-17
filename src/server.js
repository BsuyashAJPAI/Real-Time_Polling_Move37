require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const broadcast = require('./utils/broadcast');


const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
cors: {
origin: '*',
}
});


// Socket behavior
io.on('connection', (socket) => {
console.log('socket connected', socket.id);


// join a poll room
socket.on('joinPoll', (pollId) => {
const room = `poll:${pollId}`;
socket.join(room);
console.log(socket.id, 'joined', room);
});


socket.on('leavePoll', (pollId) => {
const room = `poll:${pollId}`;
socket.leave(room);
});


socket.on('disconnect', () => {
console.log('socket disconnected', socket.id);
});
});


// attach io to broadcast util so routes can emit
broadcast.init(io);


server.listen(PORT, () => {
console.log(`Server listening on http://localhost:${PORT}`);
});